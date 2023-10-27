import React, { useState } from 'react';

import { Button, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';

import { useForm } from '../../../hooks/useForm';
import {
    createBranchLocation,
    getBranchLocations,
} from '../APIs/branchLocationsAPI';
import { locationsSetBranchLocations } from '../slice/locationsSlice';
import { useFormik } from 'formik';
import { BranchLocationModal } from './Modals/BranchLocationModal';
import { branchLocationSchema } from '../../../validations/branchLocationSchema';

export const AddBranchLocationModal = () => {
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
