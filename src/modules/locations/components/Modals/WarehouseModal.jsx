import React from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';

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
                                    type="text"
                                    placeholder="Nombre"
                                    name="warehouseName"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Sucursal</Form.Label>
                                <SelectBranches />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label></Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
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
