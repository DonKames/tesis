import React from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { SelectBranches } from '../../../../shared/ui/components/SelectBranches';

export const WarehouseModal = ({
    title = 'Te falto agregar el titulo',
    formik,
    showModal,
    toggleModal,
    primaryButtonText = 'Guardar',
    // handleFormSubmit,   //Solo para pruebas
}) => {
    return (
        <Modal show={showModal} onHide={() => toggleModal(false)}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel label="Nombre">
                                    <Form.Control
                                        className={
                                            formik.touched.warehouseName &&
                                            formik.errors.warehouseName
                                                ? 'is-invalid'
                                                : ''
                                        }
                                        type="text"
                                        placeholder="Bodega Principal"
                                        name="warehouseName"
                                        value={formik.values.warehouseName}
                                        onChange={formik.handleChange}
                                        isInvalid={
                                            formik.touched.warehouseName &&
                                            formik.errors.warehouseName
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.warehouseName}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mt-3">
                                <SelectBranches
                                    errorMessage={formik.errors.branchId}
                                    branchId={formik.values.branchId}
                                    isInvalid={
                                        formik.touched.branchId &&
                                        !!formik.errors.branchId
                                    }
                                    name="branchId"
                                    setFieldTouched={formik.setFieldTouched}
                                    setFieldValue={formik.setFieldValue}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mt-3">
                                <FloatingLabel label="Capacidad en m3">
                                    <Form.Control
                                        className={
                                            formik.touched.capacity &&
                                            formik.errors.capacity
                                                ? 'is-invalid'
                                                : ''
                                        }
                                        type="number"
                                        placeholder="Capacidad en m3"
                                        name="capacity"
                                        value={formik.values.capacity}
                                        onChange={formik.handleChange}
                                        step="1"
                                        isInvalid={
                                            formik.touched.capacity &&
                                            formik.errors.capacity
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.capacity}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => toggleModal(false)}
                        variant="secondary"
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary">
                        {primaryButtonText}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

WarehouseModal.propTypes = {
    title: PropTypes.string,
    formik: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    primaryButtonText: PropTypes.string.isRequired,
};
