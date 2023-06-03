import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from '../../../hooks/useForm';

export const AddUsersModal = () => {
    const [showModal, setShowModal] = useState(false);

    const [formValues, handleInputChange, reset] = useForm({
        userName: '',
        userLastName: '',
        userRole: '',
        userEmail: '',
    });

    const { userName, userLastName, userRole, userEmail } = formValues;

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('form submit');
        console.log(JSON.stringify(formValues));
        reset();
    };

    return (
        <>
            <Button
                variant='primary'
                onClick={handleOpenModal}
            >
                Agregar Usuario
            </Button>
            <Modal
                onHide={handleCloseModal}
                show={showModal}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h1>Agregar Usuario</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Nombre Usuario</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el nombre del usuario'
                                        name='userName'
                                        value={userName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Apellido Usuario</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el apellido del usuario'
                                        name='userLastName'
                                        value={userLastName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Rol Usuario</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el rol del usuario'
                                        name='userRole'
                                        value={userRole}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>E-mail Usuario</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el e-mail del usuario'
                                        name='userName'
                                        value={userEmail}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type='button'
                        variant='primary'
                        onClick={handleFormSubmit}
                    >
                        Guardar Usuario
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
