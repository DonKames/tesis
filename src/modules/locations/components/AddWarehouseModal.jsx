import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createWarehouse, getWarehouses } from '../APIs/warehouseAPI';
import Swal from 'sweetalert2';
import { locationsSetWarehouses } from '../slice/locationsSlice';
import { WarehouseModal } from './Modals/WarehouseModal';
import { useFormik } from 'formik';

export const AddWarehouseModal = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const handleFormSubmit = async (values) => {
        const { data, message } = await createWarehouse(values);

        if (data) {
            Swal.fire({
                icon: 'success',
                title: 'Bodega creada con éxito',
                showConfirmButton: false,
                timer: 1500,
            });

            toggleModal(false);

            const warehouses = await getWarehouses();
            dispatch(locationsSetWarehouses(warehouses));
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
                showModal={showModal}
                toggleModal={toggleModal}
                primaryButtonText="Agregar"
            />
        </>
    );
};
