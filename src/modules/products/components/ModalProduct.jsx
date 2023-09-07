import React from 'react';

import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { SelectWarehouses } from '../../../shared/ui/components/SelectWarehouses';

export const ModalProduct = ({
    formValues,
    handleInputChange,
    handleInputChangeWithWarning,
    handleModalChange,
    handleUpdate,
    showModal,
    showWarning,
}) => {
    const { active, sku, bodega, epc } = formValues;

    return (
        <Modal
            show={showModal}
            onHide={handleModalChange}
        >
            <Modal.Header className='h1'>Editar Producto</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Sku</Form.Label>
                        <Form.Control
                            className='mb-3'
                            name='sku'
                            onChange={handleInputChange}
                            placeholder='Sku'
                            type='text'
                            value={sku}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bodega</Form.Label>
                        <SelectWarehouses />
                        <Form.Control
                            className='mb-3'
                            name='bodega'
                            onChange={handleInputChange}
                            placeholder='Bodega'
                            type='number'
                            value={bodega}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>EPC</Form.Label>
                        <Form.Control
                            as={'textarea'}
                            className='mb-3'
                            name='epc'
                            onChange={handleInputChange}
                            placeholder='epc'
                            type='text'
                            value={epc}
                        />
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center'>
                        <Form.Label className='me-1'>Activo:</Form.Label>
                        <Form.Switch
                            className='ms-1'
                            name='active'
                            onChange={handleInputChangeWithWarning}
                            type='switch'
                            checked={active}
                        />
                    </Form.Group>
                </Form>
                {showWarning && (
                    <div className='alert alert-warning mt-2 animate__animated animate__fadeIn animate__fast'>
                        Si desactivas este SKU, también se desactivarán todas
                        las bodegas asociadas a este SKU y los productos
                        asociados a esas bodegas.
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                    onClick={handleModalChange}
                >
                    Close
                </Button>
                <Button onClick={handleUpdate}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};

ModalProduct.propTypes = {
    showModal: PropTypes.bool.isRequired,
    handleModalChange: PropTypes.func.isRequired,
    formValues: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleInputChangeWithWarning: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    showWarning: PropTypes.bool.isRequired,
};
