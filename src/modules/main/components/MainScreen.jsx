import React from 'react';

import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserUid } from '../../users/apis/apiUsers';

export const MainScreen = () => {
    const dispatch = useDispatch();

    const { displayName, isRegistered, email, uid } = useSelector(
        (state) => state.auth,
    );

    console.log(isRegistered);

    if (!isRegistered) {
        console.log('no registrado');
        const resp = updateUserUid(email, uid);
    }

    return (
        <Container>
            <Row className='my-3'>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Resumen de la bodega</Card.Title>
                            <Card.Text>
                                Cantidad total de productos:{' '}
                                {/* {products.length} */}
                            </Card.Text>
                            <Card.Text>
                                Cantidad de productos en movimiento:{' '}
                                {/* {
                                    taskList.filter((task) => !task.completed)
                                        .length
                                } */}
                            </Card.Text>
                            <Card.Text>
                                Inventario actual:{' '}
                                {/* {products.reduce(
                                    (total, product) =>
                                        total + product.quantity,
                                    0,
                                )} */}
                            </Card.Text>
                            <Card.Text>
                                Ubicación de los productos: por implementar
                            </Card.Text>
                            <Card.Text>
                                Estado general del sistema: por implementar
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='my-3'>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Tareas de movimiento de productos
                            </Card.Title>
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

            <Row className='my-3'>
                <Col>
                    <Card>
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
