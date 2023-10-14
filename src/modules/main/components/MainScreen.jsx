import React from 'react';

import { Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserUid } from '../../users/apis/usersAPI';

import { GeneralSection } from './GeneralSection';
import { WarehouseSection } from './WarehouseSection';
import { BranchSection } from './BranchSection';
import { UsersSection } from './UsersSection';

export const MainScreen = () => {
    // Redux states
    const { isRegistered, email, uid } = useSelector((state) => state.auth);

    if (!isRegistered) {
        console.log('no registrado');
        updateUserUid(email, uid);
    }

    return (
        <Container fluid>
            <Row>
                <Col className="mb-3" xs={12} lg={6}>
                    <GeneralSection />
                </Col>
                <Col className="mb-3" xs={12} md={6} lg={3}>
                    <BranchSection />
                </Col>
                <Col className="mb-3" xs={12} md={6} lg={3}>
                    <WarehouseSection />
                </Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <Card
                        // bg='light'
                        className="shadow h-100"
                    >
                        <Card.Header>
                            <h3>Últimos Movimientos</h3>
                        </Card.Header>
                        <Card.Body>
                            {/* <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faBoxes} /> Cantidad
                                total de Skus:
                                <strong> {skusQty}</strong>
                            </Card.Text>
                            <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faBoxes} /> Cantidad
                                total de productos:
                                <strong> {productsQty}</strong>
                            </Card.Text>
                            <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faDolly} /> Cantidad de
                                productos en movimiento:{' '}
                                {taskList.filter((task) => !task.completed).length}
                            </Card.Text>
                            <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faWarehouse} />{' '}
                                Inventario actual:{' '}
                                {products.reduce((total, product) => total + product.quantity, 0)}
                            </Card.Text>
                            <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
                                Ubicación de los productos: por implementar
                            </Card.Text>
                            <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faCogs} /> Estado general
                                del sistema: por implementar
                            </Card.Text> */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="12" lg="3">
                    <UsersSection />
                    {/* <Card className="shadow h-100">
                        <Card.Header>
                            <h3>Tareas de movimiento de productos</h3>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text>Las tareas creo</Card.Text>
                            <Link to="/tasks/new" className="btn btn-primary">
                                Crear nueva tarea
                            </Link>
                        </Card.Body>
                    </Card> */}
                </Col>
            </Row>

            <Row className="my-3"></Row>

            <Row className="my-3">
                <Col>
                    <Card className=" shadow">
                        <Card.Body>
                            <Card.Title>Búsqueda de productos</Card.Title>
                            <Card.Text>
                                Por nombre, código de barras o ubicación: por
                                implementar
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
