import React from 'react';

import { Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserUid } from '../../users/apis/apiUsers';

import { GeneralSection } from './GeneralSection';
import { WarehouseSection } from './WarehouseSection';
import { BranchSection } from './BranchSection';

export const MainScreen = () => {
    // Redux states
    const { isRegistered, email, uid } = useSelector((state) => state.auth);

    if (!isRegistered) {
        console.log('no registrado');
        updateUserUid(email, uid);
    }

    return (
        <Container>
            <Row>
                <Col className='col-6'>
                    <GeneralSection />
                </Col>
                <Col className='col-3'>
                    <BranchSection />
                </Col>
                <Col className='col-3'>
                    <WarehouseSection />
                </Col>
            </Row>
            <Row className='my-3'>
                <Col>
                    <Card
                        // bg='light'
                        className='shadow h-100'
                    >
                        <Card.Header>
                            <h3>Resumen de la bodega</h3>
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
                <Col>
                    <Card className='shadow h-100'>
                        <Card.Header>
                            <h3>Tareas de movimiento de productos</h3>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text>
                                {/* {taskLoading ? (
                                    <p>Cargando tareas...</p>
                                ) : (
                                    <ul>
                                        {taskList.map((task) => (
                                            <li key={task.id}>
                                                <Link to={`/tasks/${task.id}`}>
                                                    {task.productName} (
                                                    {task.quantity}) - de{' '}
                                                    {task.fromLocation} a{' '}
                                                    {task.toLocation} -{' '}
                                                    {task.completed
                                                        ? 'Completada'
                                                        : 'Pendiente'}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )} */}
                                Las tareas creo
                            </Card.Text>
                            <Link
                                to='/tasks/new'
                                className='btn btn-primary'
                            >
                                Crear nueva tarea
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='my-3'></Row>

            <Row className='my-3'>
                <Col>
                    <Card className=' shadow'>
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
