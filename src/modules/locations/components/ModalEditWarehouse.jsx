import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getWarehouseById, updateWarehouse } from '../APIs/warehouseAPI';
import Swal from 'sweetalert2';
import { locationsSetWarehouses } from '../slice/locationsSlice';
import { useFormik } from 'formik';
import { warehouseSchema } from '../../../validations/warehouseSchema';
import { WarehouseModal } from './Modals/WarehouseModal';

export const ModalEditWarehouse = React.memo(function ModalEditWarehouse({
    warehouseId,
}) {
    const dispatch = useDispatch();

    // Local States
    const [showModal, setShowModal] = useState(false);

    // Redux States
    const { warehouses } = useSelector((state) => state.locations);

    const handleFormSubmit = async (values) => {
        console.log('valores', values);
        const { data, message } = await updateWarehouse(warehouseId, values);

        if (data) {
            const updatedWarehouses = warehouses.map((warehouse) => {
                if (warehouse.id === warehouseId) {
                    return { ...warehouse, ...data };
                }
                return warehouse;
            });

            Swal.fire({
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                title: message,
            });

            dispatch(locationsSetWarehouses(updatedWarehouses));

            toggleModal(false);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al editar la sucursal',
                text: message,
            });
        }
    };

    // Formik
    const formik = useFormik({
        initialValues: {
            warehouseName: '',
            branchId: 0,
            capacity: 0,
            active: true,
        },
        validationSchema: warehouseSchema,
        onSubmit: handleFormSubmit,
    });

    // Modal Control
    const toggleModal = async (isOpen) => {
        console.log('warehouseId', warehouseId);
        setShowModal(isOpen);

        if (!isOpen) {
            formik.resetForm();
        } else {
            if (warehouseId) {
                const { data, message } = await getWarehouseById(warehouseId);

                console.log(data);

                if (data) {
                    console.log(data, message);

                    formik.setValues({
                        warehouseName: data.name,
                        branchId: data.branchId,
                        capacity: data.capacity || 0,
                        active: data.active,
                    });
                }
            }
        }
    };

    return (
        <>
            <Button className="me-1" onClick={() => toggleModal(true)}>
                <i className="bi bi-pencil-square" />
            </Button>
            <WarehouseModal
                formik={formik}
                primaryButtonText="Editar"
                showModal={showModal}
                title="Editar Bodega"
                toggleModal={toggleModal}
            />
        </>
    );
});

ModalEditWarehouse.propTypes = {
    warehouseId: PropTypes.number.isRequired,
};
