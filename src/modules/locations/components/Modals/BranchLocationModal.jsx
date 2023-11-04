import React from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { SelectBranches } from '../../../../shared/ui/components/SelectBranches';

export const BranchLocationModal = ({
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
                                            formik.touched.name &&
                                            formik.errors.name
                                                ? 'is-invalid'
                                                : ''
                                        }
                                        type="text"
                                        placeholder="Lugar de Bodega"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        isInvalid={
                                            formik.touched.name &&
                                            formik.errors.name
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.name}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <SelectBranches
                                    branchId={formik.values.branchId}
                                    errorMessage={formik.errors.branchId}
                                    isInvalid={
                                        formik.touched.branchId &&
                                        !!formik.errors.branchId
                                    }
                                    name="branchId"
                                    setFieldTouched={formik.setFieldTouched}
                                    setFieldValue={formik.setFieldValue}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <FloatingLabel label="Descripción">
                                    <Form.Control
                                        className={
                                            formik.touched.description &&
                                            formik.errors.description
                                                ? 'is-invalid'
                                                : ''
                                        }
                                        as="textarea"
                                        placeholder="Descripción"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
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
                    <Button type="Submit" variant="primary">
                        {primaryButtonText}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

BranchLocationModal.propTypes = {
    title: PropTypes.string,
    formik: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    primaryButtonText: PropTypes.string,
    // handleFormSubmit: PropTypes.func.isRequired,   //Solo para pruebas
};
