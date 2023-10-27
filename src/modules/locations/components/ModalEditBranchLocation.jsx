import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    getBranchLocationById,
    updateBranchLocation,
} from '../APIs/branchLocationsAPI';
import Swal from 'sweetalert2';
import { locationsSetBranchLocations } from '../slice/locationsSlice';
import { useFormik } from 'formik';
import { BranchLocationModal } from './Modals/BranchLocationModal';
import { branchLocationSchema } from '../../../validations/branchLocationSchema';

export const ModalEditBranchLocation = React.memo(
    function ModalEditBranchLocation({ branchLocationId }) {
        const dispatch = useDispatch();

        // Local States
        const [showModal, setShowModal] = useState(false);

        // Redux States
        const { branches } = useSelector((state) => state.locations);

        // Form Submit
        const handleFormSubmit = async (values) => {
            console.log(values);
            const { data, message } = await updateBranchLocation(
                branchLocationId,
                values,
            );

            if (data) {
                const updatedBranchLocations = branches.map((branch) => {
                    if (branch.id === branchLocationId) {
                        return { ...branch, ...data };
                    }
                    return branch;
                });

                Swal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    title: message,
                });

                dispatch(locationsSetBranchLocations(updatedBranchLocations));
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
            } else {
                const { data } = await getBranchLocationById(branchLocationId);

                console.log(data);

                if (data) {
                    formik.setValues({
                        name: data.name,
                        branchId: data.branchId,
                        description: data.description,
                    });
                }
                // const branchLocation = branches.find(
                //     (branch) => branch.id === branchLocationId,
                // );
            }
        };

        return (
            <>
                <Button className="me-1" onClick={() => toggleModal(true)}>
                    <i className="bi bi-pencil-square" />
                </Button>
                <BranchLocationModal
                    formik={formik}
                    showModal={showModal}
                    toggleModal={toggleModal}
                    title="Editar Lugar de Sucursal"
                    primaryButtonText="Editar"
                />
            </>
        );
    },
);

ModalEditBranchLocation.propTypes = {
    branchLocationId: PropTypes.number.isRequired,
};
