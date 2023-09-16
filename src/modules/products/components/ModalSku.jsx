import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';

export const ModalSku = ({
    showModal,
    handleModalChange,
    formValues,
    handleInputChange,
    handleInputChangeWithWarning,
    handleUpdateSku,
    showWarning,
}) => {
    const { active, description, minimumStock, name, sku } = formValues;

    return (
        <Modal show={showModal} onHide={handleModalChange}>
            <Modal.Header className="h1">Editar SKU</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            className="mb-3"
                            name="name"
                            onChange={handleInputChange}
                            placeholder="Nombre"
                            type="text"
                            value={name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>SKU</Form.Label>
                        <Form.Control
                            className="mb-3"
                            name="sku"
                            onChange={handleInputChange}
                            placeholder="SKU"
                            type="text"
                            value={sku}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Stock Mínimo</Form.Label>
                        <Form.Control
                            className="mb-3"
                            min={0}
                            step={1}
                            name="minimumStock"
                            onChange={handleInputChange}
                            placeholder="Stock Mínimo"
                            type="number"
                            value={minimumStock}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as={'textarea'}
                            className="mb-3"
                            name="description"
                            onChange={handleInputChange}
                            placeholder="Descripción"
                            type="text"
                            value={description}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-center">
                        <Form.Label className="me-1">Activo:</Form.Label>
                        <Form.Switch
                            className="ms-1"
                            name="active"
                            onChange={handleInputChangeWithWarning}
                            type="switch"
                            checked={active}
                        />
                    </Form.Group>
                </Form>
                {showWarning && (
                    <div className="alert alert-warning mt-2 animate__animated animate__fadeIn animate__fast">
                        Si desactivas este SKU, también se desactivarán todas
                        las bodegas asociadas a este SKU y los productos
                        asociados a esas bodegas.
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleModalChange}
                >
                    Close
                </Button>
                <Button onClick={handleUpdateSku}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};

ModalSku.propTypes = {
    showModal: PropTypes.bool.isRequired,
    handleModalChange: PropTypes.func.isRequired,
    formValues: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleInputChangeWithWarning: PropTypes.func.isRequired,
    handleUpdateSku: PropTypes.func.isRequired,
    showWarning: PropTypes.bool.isRequired,
};
