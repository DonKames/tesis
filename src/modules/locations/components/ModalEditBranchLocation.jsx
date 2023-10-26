import React, { useState } from 'react';

import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { SelectBranches } from '../../../shared/ui/components/SelectBranches';
import { useDispatch, useSelector } from 'react-redux';
import { updateBranchLocation } from '../APIs/branchLocationsAPI';
import Swal from 'sweetalert2';
import { locationsSetBranchLocations } from '../slice/locationsSlice';
import { useFormik } from 'formik';

export const ModalEditBranchLocation = React.memo(
    function ModalEditBranchLocation({ branchLocationId }) {
        const dispatch = useDispatch();

        // Local States
        const [showModal, setShowModal] = useState(false);

        // Redux States
        const { branches } = useSelector((state) => state.locations);

        // Form Submit
        const handleFormSubmit = async (values) => {
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
                branchId: '',
                description: '',
            },
            // validationSchema: branchLocationSchema,
            onSubmit: handleFormSubmit,
        });

        // Modal Control
        const toggleModal = async (isOpen) => {
            setShowModal(isOpen);
            if (!isOpen) {
                formik.resetForm();
            } else {
                const { data, message } = await getBranchL;
                const branchLocation = branches.find(
                    (branch) => branch.id === branchLocationId,
                );

                formik.setValues({
                    name: branchLocation.name,
                    branchId: branchLocation.branchId,
                    description: branchLocation.description,
                });
            }
        };

        return (
            <Modal show={showModal} onHide={handleModalChange}>
                <Modal.Header className="h1">
                    Editar Lugar de Sucursal
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                className="mb-3"
                                name="name"
                                placeholder="Nombre"
                                type="text"
                                value={name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Sucursal</Form.Label>
                            <SelectBranches
                                onChange={handleInputChange}
                                name="branchId"
                                branchId={branchId}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                className="mb-3"
                                name="description"
                                placeholder="Capacidad"
                                type="text"
                                value={description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn btn-secondary"
                        onClick={() => handleModalChange()}
                    >
                        Cancelar
                    </Button>
                    <Button
                        className="btn btn-primary"
                        onClick={() => {
                            handleUpdate();
                        }}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    },
);

ModalEditBranchLocation.propTypes = {
    branchLocationId: PropTypes.number.isRequired,
};
