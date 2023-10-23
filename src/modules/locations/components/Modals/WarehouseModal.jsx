import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { SelectBranches } from '../../../../shared/ui/components/SelectBranches';

export const WarehouseModal = ({
    title = 'Te falto agregar el titulo',
    formik,
    showModal,
    toggleModal,
    primaryButtonText = 'Guardar',
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
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    className={
                                        formik.touched.warehouseName &&
                                        formik.errors.warehouseName
                                            ? 'is-invalid'
                                            : ''
                                    }
                                    type="text"
                                    placeholder="Nombre"
                                    name="warehouseName"
                                    value={formik.values.warehouseName}
                                    onChange={formik.handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Sucursal</Form.Label>
                                <SelectBranches
                                    errorMessage={formik.errors.branchId}
                                    branchId={formik.values.branchId}
                                    name="branchId"
                                    setFieldTouched={formik.setFieldTouched}
                                    setFieldValue={formik.setFieldValue}
                                    isInvalid={
                                        formik.touched.branch &&
                                        !!formik.errors.branch
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Capacidad</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Capacidad"
                                    name="capacity"
                                    value={formik.values.capacity}
                                    onChange={formik.handleChange}
                                />
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
