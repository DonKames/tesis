/* The code is a React component called `ModalEditBranch` that represents a modal for editing a branch.
It uses the `useFormik` hook from the `formik` library for form validation. The component receives a
`branchId` prop which is required. */
/* The code is a React component called `ModalEditBranch` that represents a modal for editing a branch. */

// Validation
import { useFormik } from 'formik';

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { BranchModal } from './Modals/BranchModal';
import { locationsSetBranches } from '../slice/locationsSlice';
import { branchSchema } from '../../../validations/branchSchema';
import { getBranchById, updateBranch } from '../APIs/branchesAPI';

/**
 * Modal for editing a branch.
 * @param {Object} props - The component props.
 * @param {number} props.branchId - The ID of the branch to edit.
 * @returns {JSX.Element} - The ModalEditBranch component.
 */
export const ModalEditBranch = React.memo(function ModalEditBranch({
    branchId,
}) {
    const dispatch = useDispatch();

    // Local States
    const [showModal, setShowModal] = useState(false);

    // Redux States
    const { branches } = useSelector((state) => state.locations);

    // Form Submit
    const handleFormSubmit = async (values) => {
        const { data, message } = await updateBranch(branchId, values);

        if (data) {
            const updatedBranches = branches.map((branch) => {
                if (branch.id === branchId) {
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

            dispatch(locationsSetBranches(updatedBranches));
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
        } else {
            if (branchId) {
                const { data, message } = await getBranchById(branchId);

                if (data) {
                    console.log(data, message);
                    const formikState = {
                        branchName: data.name,
                        country: data.countryId,
                        region: data.regionId,
                        municipality: data.municipalityId,
                        address: data.address,
                    };

                    formik.setValues(formikState);
                }
            }
        }
    };

    return (
        <>
            <Button className="me-1" onClick={() => toggleModal(true)}>
                <i className="bi bi-pencil-square" />
            </Button>
            <BranchModal
                title="Editar Sucursal"
                showModal={showModal}
                toggleModal={toggleModal}
                formik={formik}
                primaryButtonText="Editar"
            />
        </>
    );
});

ModalEditBranch.propTypes = {
    branchId: PropTypes.number.isRequired,
};
