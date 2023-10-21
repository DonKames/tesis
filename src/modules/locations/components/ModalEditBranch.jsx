/* The code is a React component called `ModalEditBranch` that represents a modal for editing a branch.
It uses the `useFormik` hook from the `formik` library for form validation. The component receives a
`branchId` prop which is required. */
/* The code is a React component called `ModalEditBranch` that represents a modal for editing a branch. */

// Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getBranchById, updateBranch } from '../APIs/branchesAPI';
import PropTypes from 'prop-types';
import { BranchModal } from './Modals/BranchModal';
import { useDispatch, useSelector } from 'react-redux';
import { locationsSetBranches } from '../slice/locationsSlice';
import Swal from 'sweetalert2';
import { branchSchema } from '../../../validations/branchSchema';

/* The `validationSchema` constant is defining the validation rules for the form fields in the
`ModalEditBranch` component. It is using the `Yup` library to create a validation schema object. */

// const validationSchema = Yup.object({
//     branchName: Yup.string().required(
//         'El nombre de la sucursal es obligatorio',
//     ),
//     country: Yup.number()
//         .required('El país es obligatorio')
//         .notOneOf([0], 'Debe elegir un País'),
//     region: Yup.number()
//         .required('La región es obligatoria')
//         .notOneOf([0], 'Debe elegir una Región'),
//     municipality: Yup.number()
//         .required('La comuna es obligatoria')
//         .notOneOf([0], 'Debe elegir una Comuna'),
//     address: Yup.string().required('La dirección es obligatoria'),
// });

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
        branchSchema,
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
