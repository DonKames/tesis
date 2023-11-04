import React from 'react';

import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { SelectWarehouses } from '../../../shared/ui/components/SelectWarehouses';
import { SelectBranches } from '../../../shared/ui/components/SelectBranches';
import { SelectSkus } from '../../../shared/ui/components/SelectSkus';

export const ModalProduct = React.memo(function ModalProduct({
    formik,
    handleModalChange,
    showModal,
}) {
    // console.log(formik);
    const { skuId, warehouseId, branchId, epc } = formik.values;

    return (
        <Modal show={showModal} onHide={handleModalChange}>
            <Modal.Header className="h1">Editar Producto</Modal.Header>
            <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <Form.Group className="">
                        <SelectSkus
                            errorMessage={formik.errors.skuId}
                            name="skuId"
                            isInvalid={
                                formik.touched.skuId && !!formik.errors.skuId
                            }
                            setFieldTouched={formik?.setFieldTouched}
                            setFieldValue={formik?.setFieldValue}
                            skuId={skuId}
                        />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <SelectBranches
                            errorMessage={formik.errors.branchId}
                            name="branchId"
                            isInvalid={
                                formik.touched.branchId &&
                                !!formik.errors.branchId
                            }
                            setFieldTouched={formik.setFieldTouched}
                            setFieldValue={formik.setFieldValue}
                            branchId={branchId}
                        />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <SelectWarehouses
                            branchId={formik.values.branchId}
                            errorMessage={formik.errors.warehouseId}
                            isInvalid={
                                formik.touched.warehouseId &&
                                !!formik.errors.warehouseId
                            }
                            name="warehouseId"
                            setFieldTouched={formik.setFieldTouched}
                            setFieldValue={formik.setFieldValue}
                            selectedBranch={branchId}
                            warehouseId={warehouseId}
                        />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <FloatingLabel label="EPC">
                            <Form.Control
                                // as={'textarea'}
                                className={
                                    formik.touched.epc && formik.errors.epc
                                        ? 'is-invalid'
                                        : ''
                                }
                                name="epc"
                                onChange={formik.handleChange}
                                placeholder="Ingrese el EPC"
                                type="text"
                                value={epc}
                                isInvalid={
                                    formik.touched.epc && formik.errors.epc
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.epc}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
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
                    <Button type="submit">Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
});

ModalProduct.propTypes = {
    formik: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    handleModalChange: PropTypes.func.isRequired,
};
