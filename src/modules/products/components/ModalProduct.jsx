import React from 'react';

import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { SelectWarehouses } from '../../../shared/ui/components/SelectWarehouses';
import { SelectBranches } from '../../../shared/ui/components/SelectBranches';
import { SelectSkus } from '../../../shared/ui/components/SelectSkus';

export const ModalProduct = React.memo(function ModalProduct({
    formValues,
    handleInputChange,
    handleInputChangeWithWarning,
    handleModalChange,
    handleUpdate,
    productId,
    showModal,
    showWarning,
}) {
    console.log(formValues);
    const { active, skuId, warehouseId, branchId, epc } = formValues;

    return (
        <Modal show={showModal} onHide={handleModalChange}>
            <Modal.Header className="h1">Editar Producto</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Sku</Form.Label>
                        <SelectSkus
                            handleInputChange={handleInputChange}
                            name="skuId"
                            skuId={skuId}
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
                        <Form.Label>Bodega</Form.Label>
                        <SelectWarehouses
                            handleInputChange={handleInputChange}
                            name="warehouseId"
                            warehouseId={warehouseId}
                            selectedBranch={branchId}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>EPC</Form.Label>
                        <Form.Control
                            as={'textarea'}
                            className="mb-3"
                            name="epc"
                            onChange={handleInputChange}
                            placeholder="epc"
                            type="text"
                            value={epc}
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
                <Button onClick={handleUpdate}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
});

ModalProduct.propTypes = {
    formValues: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleInputChangeWithWarning: PropTypes.func.isRequired,
    handleModalChange: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    productId: PropTypes.number,
    showModal: PropTypes.bool.isRequired,
    showWarning: PropTypes.bool.isRequired,
};
