import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';

import { createWarehouse, getWarehouses } from '../APIs/warehouseAPI';
import { WarehouseModal } from './Modals/WarehouseModal';
import { warehouseSchema } from '../../../validations/warehouseSchema';
import { useDispatch } from 'react-redux';
import {
    locationsSetWarehouses,
    locationsSetWarehousesQty,
} from '../slice/locationsSlice';

export const AddWarehouseModal = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (values) => {
        const { data, message } = await createWarehouse(values);

        if (data) {
            Swal.fire({
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 1500,
            });

            const { data: warehousesData } = await getWarehouses();

            if (warehousesData) {
                dispatch(locationsSetWarehouses(warehousesData.data));
            }

            // const { data: warehousesQty } = await getWarehousesQty({});

            if (warehousesData) {
                dispatch(locationsSetWarehousesQty(warehousesData.qty));
            }

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

    // * Para pruebas
    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(formik.values);
    //     console.log(formik.errors);
    //     console.log(formik.touched.capacity);
    //     console.log(formik.errors.capacity);

    //     console.log(formik.touched.warehouseName);
    //     console.log(formik.errors.warehouseName);
    //     await formik.validateForm();
    //     if (formik.isValid) {
    //         formik.handleSubmit(); // Llamar a la función de envío si el formulario es válido
    //     }
    // };

    // Formik
    const formik = useFormik({
        initialValues: {
            warehouseName: '',
            branchId: 0,
            capacity: 0,
            active: true,
        },
        validationSchema: warehouseSchema,
        onSubmit: handleSubmit,
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
                // handleFormSubmit={handleFormSubmit}
            />
        </>
    );
};
