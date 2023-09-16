import React from 'react';
import { Card, Col, Container, ListGroup, Row, Table } from 'react-bootstrap';

export const TasksScreen = () => {
    return (
        <Container>
            <Row className="my-3">
                <Col>
                    <h1>Tareas</h1>
                </Col>
            </Row>
            <Row className="my-3">
                <Col md={3}>
                    <Card>
                        <Card.Header as="h5">Tareas Pendientes</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Producto 1</ListGroup.Item>
                            <ListGroup.Item>Producto 2</ListGroup.Item>
                            <ListGroup.Item>Producto 3</ListGroup.Item>
                            <ListGroup.Item>Producto 4</ListGroup.Item>
                            <ListGroup.Item>Producto 5</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header as="h5">Historial Tareas</Card.Header>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Fecha</th>
                                    <th>Desde</th>
                                    <th>Hacia</th>
                                    <th>Cantidad</th>
                                    <th>Encargado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Producto 1</td>
                                    <td>2023-04-25</td>
                                    <td>Bodega 1</td>
                                    <td>Bodega 2</td>
                                    <td>10</td>
                                    <td>Usuario 1</td>
                                </tr>
                                <tr>
                                    <td>Producto 2</td>
                                    <td>2023-04-24</td>
                                    <td>Bodega 2</td>
                                    <td>Bodega 1</td>
                                    <td>5</td>
                                    <td>Usuario 2</td>
                                </tr>
                                <tr>
                                    <td>Producto 3</td>
                                    <td>2023-04-23</td>
                                    <td>Bodega 1</td>
                                    <td>Bodega 2</td>
                                    <td>20</td>
                                    <td>Usuario 3</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
