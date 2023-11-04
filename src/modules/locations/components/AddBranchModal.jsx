import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

import { BranchModal } from './Modals/BranchModal';
import { branchSchema } from '../../../validations/branchSchema';
import { createBranch, getBranches } from '../APIs/branchesAPI';
import { locationsSetBranches } from '../slice/locationsSlice';

export const AddBranchModal = () => {
    const dispatch = useDispatch();

    // Local States
    const [showModal, setShowModal] = useState(false);

    const handleFormSubmit = async (values) => {
        const { data, message } = await createBranch(values);

        if (data) {
            Swal.fire({
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                title: message,
            });

            toggleModal(false);

            const { branchesData } = await getBranches();

            if (branchesData) {
                dispatch(locationsSetBranches(branchesData));
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar la sucursal',
                text: message,
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            branchName: '',
            country: 35,
            region: 0,
            municipality: 0,
            address: '',
        },
        validationSchema: branchSchema,
        onSubmit: handleFormSubmit,
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
                Agregar Sucursal
            </Button>
            <BranchModal
                formik={formik}
                primaryButtonText="Agregar"
                showModal={showModal}
                title="Agregar Sucursal"
                toggleModal={setShowModal}
            />
        </>
    );
};
