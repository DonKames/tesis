import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { UserModal } from './Modals/UserModal';
import Swal from 'sweetalert2';
import { usersSetUsers } from '../slice/usersSlice';
import { updateUser } from '../apis/usersAPI';
import { userSchema } from '../../../validations/userSchema';

export const ModalEditUser = React.memo(function ModalEditUser({ userId }) {
    const dispatch = useDispatch();

    // Local States
    const [showModal, setShowModal] = useState(false);

    // Redux States
    const { users } = useSelector((state) => state.users);
    const { roles } = useSelector((state) => state.ui);

    const handleFormSubmit = async (values) => {
        // console.log(values);

        const { id, roleId } = values;

        try {
            const { data: completeData } = await updateUser(id, values);

            const { status, message } = completeData;

            if (status === 'success') {
                Swal.fire({
                    title: '¡Usuario Actualizado!',
                    text: message || 'No Message',
                    icon: 'success',
                });

                /* eslint-disable indent */
                const updatedUsers = users.map((user) =>
                    user.id === id
                        ? {
                              ...user,
                              ...values,
                              roleName: roles.find((rol) => rol.id === roleId)
                                  ?.name,
                          }
                        : user,
                );
                /* eslint-enable indent */

                dispatch(usersSetUsers(updatedUsers));

                toggleModal(false);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: message || 'No Message',
                    icon: 'error',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el usuario - Error al conectar con la API',
                icon: 'error',
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            id: 0,
            name: '',
            lastName: '',
            email: '',
            roleId: 0,
            active: true,
        },
        onSubmit: handleFormSubmit,
        validationSchema: userSchema,
    });

    const toggleModal = async (isOpen) => {
        setShowModal(isOpen);
        if (!isOpen) {
            formik.resetForm();
        } else {
            const user = users.find((user) => user.id === userId);
            formik.setValues(user);
        }
    };

    return (
        <>
            <Button className="me-1" onClick={() => toggleModal(true)}>
                <i className="bi bi-pencil-square" />
            </Button>
            <UserModal
                formik={formik}
                primaryButtonText="Editar"
                showModal={showModal}
                title="Editar Usuario"
                toggleModal={toggleModal}
            />
        </>
    );
});

ModalEditUser.propTypes = {
    userId: PropTypes.number.isRequired,
};
