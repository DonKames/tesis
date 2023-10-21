// Validation
import { useFormik } from 'formik';

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { createBranch, getBranches } from '../APIs/branchesAPI';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { locationsSetBranches } from '../slice/locationsSlice';
import { BranchModal } from './Modals/BranchModal';
import { branchSchema } from '../../../validations/branchSchema';

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
            handleCloseModal();

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

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        formik.resetForm();
    };

    return (
        <>
            <Button variant="primary shadow-sm mb-2" onClick={handleOpenModal}>
                Agregar Sucursal
            </Button>
            <BranchModal
                title="Agregar Sucursal"
                formik={formik}
                showModal={showModal}
                toggleModal={setShowModal}
                primaryButtonText="Agregar"
            />
        </>
    );
};
