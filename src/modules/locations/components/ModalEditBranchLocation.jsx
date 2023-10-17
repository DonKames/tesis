import React from 'react';

import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { SelectBranches } from '../../../shared/ui/components/SelectBranches';

export const ModalEditBranchLocation = React.memo(
    function ModalEditBranchLocation({
        formValues,
        handleInputChange,
        handleModalChange,
        handleUpdate,
        showModal,
    }) {
        const { name, branchId, description } = formValues;

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
    formValues: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleModalChange: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
};
