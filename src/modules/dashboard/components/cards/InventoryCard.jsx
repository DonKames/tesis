import React, { useEffect, useState } from 'react';
import { Card, Button, ListGroup, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProductsCountByWarehouse,
    getProductsQty,
} from '../../../products/APIs/productsAPI';
import { productsSetProductQty } from '../../../products/slice/productsSlice';
import { CustomBarChart } from '../../../../shared/ui/components/charts/CustomBarChart';
import { getLastAddedProducts } from '../../../movements/APIs/movementAPI';
import { movementsSetData } from '../../../movements/movementSlice';

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
                    const { data } = await getLastAddedProducts(5);

                    console.log(data);

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
                    <h6>Ítems Recientemente Añadidos</h6>
                    <div className="recent-items-container">
                        {lastAdded.map((m) => (
                            <Card key={m.id}>
                                <Card.Body>
                                    <Card.Title>{m.productName}</Card.Title>
                                    <Card.Text>
                                        Cantidad: {m.quantity}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            // <Badge
                            //     pill
                            //     bg="secondary"
                            //     key={m.id}
                            //     className="me-2"
                            // >
                            //     {m.productId}
                            // </Badge>
                        ))}
                    </div>
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
