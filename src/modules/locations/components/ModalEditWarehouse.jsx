import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { SelectBranches } from '../../../shared/ui/components/SelectBranches';

export const ModalEditWarehouse = React.memo(function ModalEditWarehouse({
    formValues,
    handleInputChange,
    handleModalChange,
    handleUpdate,
    showModal,
}) {
    const { name, branchId, capacity, active } = formValues;

    return (
        <Modal show={showModal} onHide={handleModalChange}>
            <Modal.Header className="h1">Editar Bodega</Modal.Header>
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
                        <Form.Label>Capacidad</Form.Label>
                        <Form.Control
                            className="mb-3"
                            name="capacity"
                            placeholder="Capacidad"
                            type="number"
                            value={capacity}
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
                        handleUpdate(formValues);
                        handleModalChange();
                    }}
                >
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

ModalEditWarehouse.propTypes = {
    formValues: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleModalChange: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
};
