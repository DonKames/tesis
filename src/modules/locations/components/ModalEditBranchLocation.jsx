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
import useHasAccess from '../../../shared/hooks/useHasAccess';

export const ModalEditBranchLocation = React.memo(
    function ModalEditBranchLocation({ branchLocationId }) {
        const dispatch = useDispatch();

        // Local States
        const [showModal, setShowModal] = useState(false);

        // Redux States
        const { branchLocations } = useSelector((state) => state.locations);

        const hasAccess = useHasAccess([1, 2]);

        // Form Submit
        const handleFormSubmit = async (values) => {
            console.log(values);
            const { data, message } = await updateBranchLocation(
                branchLocationId,
                values,
            );

            if (data) {
                const updatedBranchLocations = branchLocations.map(
                    (branchLocation) => {
                        if (branchLocation.id === branchLocationId) {
                            return { ...branchLocation, ...data };
                        }
                        return branchLocation;
                    },
                );

                Swal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    title: message,
                });

                dispatch(locationsSetBranchLocations(updatedBranchLocations));

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
            }
        };

        return (
            <>
                <Button
                    className="me-1"
                    disabled={!hasAccess}
                    onClick={() => toggleModal(true)}
                >
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
