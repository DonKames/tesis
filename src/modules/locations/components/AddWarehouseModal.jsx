import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';

import { createWarehouse } from '../APIs/warehouseAPI';
import { WarehouseModal } from './Modals/WarehouseModal';

export const AddWarehouseModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleFormSubmit = async (values) => {
        const { data, message } = await createWarehouse(values);

        if (data) {
            Swal.fire({
                icon: 'success',
                title: '',
                showConfirmButton: false,
                timer: 1500,
            });

            toggleModal(false);
        } else {
            console.log(message);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la Bodega',
                text: message,
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            warehouseName: '',
            branchId: 0,
            capacity: 0,
            active: true,
        },
        // ! TODO crear el Schema
        // validationSchema: branchSchema,
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
                Agregar Bodega
            </Button>
            <WarehouseModal
                formik={formik}
                primaryButtonText="Agregar"
                showModal={showModal}
                title="Agregar Bodega"
                toggleModal={toggleModal}
            />
        </>
    );
};
