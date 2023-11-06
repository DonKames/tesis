import React, { useEffect, useState } from 'react';
import {
    Card,
    Button,
    ListGroup,
    Row,
    Col,
    ListGroupItem,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProductsCountByWarehouse,
    getProductsQty,
} from '../../../products/APIs/productsAPI';
import { productsSetProductQty } from '../../../products/slice/productsSlice';
import { CustomBarChart } from '../../../../shared/ui/components/charts/CustomBarChart';
import { getLastAddedProducts } from '../../../movements/APIs/movementAPI';
import { movementsSetData } from '../../../movements/movementSlice';
import {
    timestampDate,
    timestampTime,
} from '../../../../shared/utils/stringUtils';

export const InventoryCard = () => {
    // {
    // inventoryOverview,
    // recentItems,
    // lowStockItems,
    // }
    const dispatch = useDispatch();

    const [warehouseData, setWarehouseData] = useState(null);

    const { productsQty } = useSelector((state) => state.products);
    const { lastAdded } = useSelector((state) => state.movements);

    const getChartData = async () => {
        const data = await getProductsCountByWarehouse();
        // console.log(data);

        const formattedData = data.map((element) => {
            return {
                name: element.warehouseName,
                Cantidad: parseInt(element.qty),
            };
        });

        setWarehouseData(formattedData);
    };

    useEffect(() => {
        getChartData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!productsQty) {
                    const { data } = await getProductsQty({});

                    // console.log(data);

                    dispatch(productsSetProductQty(data));
                }

                if (!lastAdded.length) {
                    const { data } = await getLastAddedProducts(6);

                    // console.log(data);

                    dispatch(movementsSetData({ lastAdded: data }));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    return (
        <Card>
            <Card.Header as="h5">Gestión de Inventario</Card.Header>
            <ListGroup variant="flush">
                {/* Sección de Visión General del Inventario */}
                <ListGroup.Item>
                    <Row>
                        <Col className="mt-3">
                            <h6>Visión General del Inventario</h6>
                            <div>Total de Ítems: {productsQty}</div>
                            {/* <div>Estado del Stock: {inventoryOverview.stockStatus}</div> */}
                        </Col>
                        <Col>
                            <CustomBarChart
                                data={warehouseData}
                                xKey="name"
                                yKey="Cantidad"
                                barFill="#8884d8"
                            />
                        </Col>
                    </Row>
                </ListGroup.Item>

                {/* Sección de Ítems Recientemente Añadidos */}
                <ListGroup.Item>
                    <Col xs={12} lg={4}>
                        <h4>Ítems Recientemente Añadidos</h4>
                        {lastAdded.map((m) => (
                            <Card key={m.id} className="mb-2">
                                <Card.Header>
                                    <Card.Title>
                                        <strong>{m.name}</strong>
                                    </Card.Title>
                                </Card.Header>

                                {/*
                                    // * Para ver como queda con lineas separadoras
                                */}
                                {/* <ListGroup>
                                    <ListGroupItem>
                                        <Row className="mb-2">
                                            <Col xs={4}>
                                                <Card.Text>
                                                    Descripción
                                                </Card.Text>
                                            </Col>
                                            <Col xs={1}>
                                                <Card.Text>:</Card.Text>
                                            </Col>
                                            <Col xs={7}>
                                                <Card.Text>
                                                    {m.description}
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                </ListGroup> */}
                                <Card.Body>
                                    <Row className="mb-2">
                                        <Col xs={4}>
                                            <Card.Text>Descripción</Card.Text>
                                        </Col>
                                        <Col xs={1}>
                                            <Card.Text>:</Card.Text>
                                        </Col>
                                        <Col xs={7}>
                                            <Card.Text>
                                                {m.description}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col xs={4}>
                                            <Card.Text>Usuario</Card.Text>
                                        </Col>
                                        <Col xs={1}>
                                            <Card.Text>:</Card.Text>
                                        </Col>
                                        <Col xs={7}>
                                            <Card.Text>
                                                {m.userFirstName +
                                                    ' ' +
                                                    m.userLastName}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col xs={4}>
                                            <Card.Text>EPC</Card.Text>
                                        </Col>
                                        <Col xs={1}>
                                            <Card.Text>:</Card.Text>
                                        </Col>
                                        <Col xs={7}>
                                            <Card.Text>{m.epc}</Card.Text>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col xs={4}>
                                            <Card.Text>Fecha</Card.Text>
                                        </Col>
                                        <Col xs={1}>
                                            <Card.Text>:</Card.Text>
                                        </Col>
                                        <Col xs={7}>
                                            <Card.Text>
                                                {timestampDate(m.timestamp)} -{' '}
                                                {timestampTime(m.timestamp)}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </ListGroup.Item>

                {/* Sección de Alertas de Stock Bajo */}
                <ListGroup.Item>
                    <h6>Alertas de Stock Bajo</h6>
                    {/* {lowStockItems.map((item, index) => (
                        <div key={index} className="low-stock-item">
                            {item.name} (Quedan: {item.quantity})
                        </div>
                    ))} */}
                </ListGroup.Item>
            </ListGroup>
            <Card.Footer>
                <Button variant="primary">Ver Detalles</Button>
            </Card.Footer>
        </Card>
    );
};
