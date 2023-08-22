import React, { useCallback, useEffect } from 'react';

import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserUid } from '../../users/apis/apiUsers';
import { getProductsQty } from '../../products/APIs/apiProducts';
import {
    productsSetProductQty,
    productsSetSkusQty,
} from '../../products/slice/productsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBoxes,
    faDolly,
    faWarehouse,
    faMapMarkerAlt,
    faCogs,
} from '@fortawesome/free-solid-svg-icons';
import { getSkusQty } from '../../products/APIs/apiSkus';
import { GeneralSection } from './GeneralSection';
import { WarehouseSection } from './WarehouseSection';
import { BranchSection } from './BranchSection';
import { getWarehousesNames } from '../../locations/APIs/apiWarehouses';
import { uiSetWarehousesNames } from '../../../shared/ui/uiSlice';

export const MainScreen = () => {
    const dispatch = useDispatch();

    // Redux states
    const { productsQty, skusQty } = useSelector((state) => state.products);
    const { isRegistered, email, uid } = useSelector((state) => state.auth);
    const { warehousesNames } = useSelector((state) => state.ui);

    console.log(isRegistered, productsQty);

    if (!isRegistered) {
        console.log('no registrado');
        updateUserUid(email, uid);
    }

    const fetchData = useCallback(async () => {
        console.log('dentro del fetch' + productsQty);
        if (productsQty === null) {
            const { productsQty } = await getProductsQty();
            console.log(productsQty);
            dispatch(productsSetProductQty(productsQty));
        }

        if (skusQty === null) {
            const skusQty = await getSkusQty();
            console.log(skusQty);
            dispatch(productsSetSkusQty(skusQty));
        }

        if (!warehousesNames.length) {
            const warehousesNames = await getWarehousesNames();
            dispatch(uiSetWarehousesNames(warehousesNames));
        }
    }, [dispatch, productsQty, skusQty, warehousesNames]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Container>
            <Row>
                <Col className='col-6'>
                    <GeneralSection />
                </Col>
                <Col className='col-3 h-100'>
                    <WarehouseSection />
                </Col>
                <Col className='col-3 h-100'>
                    <BranchSection />
                </Col>
            </Row>
            <Row className='my-3'>
                <Col>
                    <Card
                        bg='light'
                        className='shadow h-100'
                    >
                        <Card.Header>
                            <h3>Resumen de la bodega</h3>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className='my-2'>
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
                                {/* {taskList.filter((task) => !task.completed).length} */}
                            </Card.Text>
                            <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faWarehouse} />{' '}
                                Inventario actual:{' '}
                                {/* {products.reduce((total, product) => total + product.quantity, 0)} */}
                            </Card.Text>
                            <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
                                Ubicación de los productos: por implementar
                            </Card.Text>
                            <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faCogs} /> Estado general
                                del sistema: por implementar
                            </Card.Text>
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
