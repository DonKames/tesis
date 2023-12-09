import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { userSchema } from '../../../validations/userSchema';
import { UserModal } from './Modals/UserModal';
import { createUser, getUsersQty } from '../apis/usersAPI';
import Swal from 'sweetalert2';
import { usersSetUsersQty } from '../slice/usersSlice';

export const AddUserModal = () => {
    const dispatch = useDispatch();

    // Local States
    const [showModal, setShowModal] = useState(false);

    const handleFormSubmit = async (values) => {
        try {
            const { status } = await createUser(values);

            if (status === 200) {
                Swal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    title: 'Usuario creado correctamente',
                });

                const { data, status, message } = await getUsersQty({
                    showInactive: false,
                });

                console.log(data, status, message);

                if (data) {
                    dispatch(usersSetUsersQty(data));
                }

                toggleModal(false);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear el Usuario',
                    text: 'Error',
                });
            }

            // console.log(response);
        } catch (error) {}
        // console.log('handleFormSubmit', values);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            roleId: 0,
            active: true,
        },
        onSubmit: handleFormSubmit,
        validationSchema: userSchema,
    });

    // Modal Control
    const toggleModal = async (isOpen) => {
        setShowModal(isOpen);
        if (!isOpen) {
            formik.resetForm();
        }
    };
    return (
        <>
            <Button
                variant="primary"
                onClick={() => toggleModal(true)}
                className="shadow-sm mb-2"
            >
                Agregar Usuario
            </Button>
            <UserModal
                formik={formik}
                primaryButtonText="Agregar"
                showModal={showModal}
                title="Agregar Usuario"
                toggleModal={setShowModal}
                editing={false}
            />
        </>
    );
};
