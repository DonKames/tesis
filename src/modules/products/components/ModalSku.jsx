import React from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

export const ModalSku = ({ showModal, handleModalChange, formik }) => {
    const { description, minimumStock, name, sku } = formik.values;

    return (
        <Modal show={showModal} onHide={handleModalChange}>
            <Modal.Header className="h1">Editar SKU</Modal.Header>
            <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-2">
                        <FloatingLabel label="Nombre">
                            <Form.Control
                                className={
                                    formik.touched.name && formik.errors.name
                                        ? 'is-invalid'
                                        : ''
                                }
                                name="name"
                                onChange={formik.handleChange}
                                placeholder="Nombre"
                                type="text"
                                value={name}
                                isInvalid={
                                    formik.touched.epc && formik.errors.epc
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.name}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <FloatingLabel label="SKU">
                            <Form.Control
                                className={
                                    formik.touched.sku && formik.errors.sku
                                        ? 'is-invalid'
                                        : ''
                                }
                                name="sku"
                                onChange={formik.handleChange}
                                placeholder="SKU"
                                type="text"
                                value={sku}
                                isInvalid={
                                    formik.touched.sku && formik.errors.sku
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.sku}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        {/* <SelectSkus
                            errorMessage={formik.errors.sku}
                            name="sku"
                            isInvalid={
                                formik.touched.sku && !!formik.errors.sku
                            }
                            setFieldTouched={formik?.setFieldTouched}
                            setFieldValue={formik?.setFieldValue}
                            skuId={sku}
                        /> */}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <FloatingLabel label={'Stock Mínimo'}>
                            <Form.Control
                                className={
                                    formik.touched.minimumStock &&
                                    formik.errors.minimumStock
                                        ? 'is-invalid'
                                        : ''
                                }
                                min={0}
                                step={1}
                                name="minimumStock"
                                onChange={formik.handleChange}
                                placeholder="Stock Mínimo"
                                type="number"
                                value={minimumStock}
                                isInvalid={
                                    formik.touched.minimumStock &&
                                    formik.errors.minimumStock
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.minimumStock}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="Descripción">
                            <Form.Control
                                as={'textarea'}
                                className={
                                    formik.touched.description &&
                                    formik.errors.description
                                        ? 'is-invalid'
                                        : ''
                                }
                                name="description"
                                onChange={formik.handleChange}
                                placeholder=""
                                type="text"
                                value={description}
                                isInvalid={
                                    formik.touched.description &&
                                    formik.errors.description
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.description}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    {/* <Form.Group className="d-flex justify-content-center">
                        <Form.Label className="me-1">Activo:</Form.Label>
                        <Form.Switch
                            className="ms-1"
                            name="active"
                            onChange={handleInputChangeWithWarning}
                            type="switch"
                            checked={active}
                        />
                    </Form.Group> */}
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
};

ModalSku.propTypes = {
    formik: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    handleModalChange: PropTypes.func.isRequired,
};
