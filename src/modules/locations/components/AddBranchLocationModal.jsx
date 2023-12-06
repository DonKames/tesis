import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import {
    createBranchLocation,
    getBranchLocations,
} from '../APIs/branchLocationsAPI';
import { useFormik } from 'formik';
import { BranchLocationModal } from './Modals/BranchLocationModal';
import { branchLocationSchema } from '../../../validations/branchLocationSchema';
import { useDispatch } from 'react-redux';
import {
    locationsSetBranchLocations,
    locationsSetBranchLocationsQty,
} from '../slice/locationsSlice';

export const AddBranchLocationModal = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handleFormSubmit = async (values) => {
        const { data, message } = await createBranchLocation(values);

        if (data) {
            Swal.fire({
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 1500,
            });

            toggleModal(false);

            const { data: branchLocations } = await getBranchLocations();

            console.log('branchesData: ', branchLocations);

            if (branchLocations) {
                dispatch(locationsSetBranchLocations(branchLocations.data));
                dispatch(locationsSetBranchLocationsQty(branchLocations.qty));
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el Lugar',
                text: message,
            });
        }
    };

    // Formik
    const formik = useFormik({
        initialValues: {
            name: '',
            branchId: 0,
            description: '',
        },
        validationSchema: branchLocationSchema,
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
                className="mb-2 shadow-sm"
            >
                Agregar Lugar
            </Button>
            <BranchLocationModal
                title="Agregar Lugar"
                formik={formik}
                primaryButtonText="Agregar"
                showModal={showModal}
                toggleModal={toggleModal}
            />
        </>
    );
};
