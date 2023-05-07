import React, { useState } from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    Modal,
    Row,
    Table,
} from 'react-bootstrap';

export const LocationsScreen = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container fluid>
            <Row className='align-items-center'>
                <Col
                    xs='12'
                    md='6'
                >
                    <Row>
                        <Col>
                            <h1>Sucursales</h1>
                        </Col>
                        <Col className='text-center'>
                            <Button
                                type='button'
                                onClick={handleShow}
                            >
                                Agregar Sucursal
                            </Button>
                        </Col>
                    </Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>Haya yay</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Yay</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col
                    xs='12'
                    md='6'
                >
                    <h1>Bodegas</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>bodega</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>bodega</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header>Agregar Sucursal</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Nombre Sucursal</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el nombre de la Sucursal'
                                        name='branch'
                                        // value={productName}
                                        // onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>País</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el nombre del producto'
                                        name='productName'
                                        // value={productName}
                                        // onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Región</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el nombre del producto'
                                        name='productName'
                                        // value={productName}
                                        // onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ingrese el nombre del producto'
                                name='productName'
                                // value={productName}
                                // onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant='primary'
                        onClick={handleClose}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
