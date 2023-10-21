import React from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';

import PropTypes from 'prop-types';

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
                                <Form.Label></Form.Label>
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
