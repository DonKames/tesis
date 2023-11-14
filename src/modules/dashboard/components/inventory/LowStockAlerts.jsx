import React, { useEffect } from 'react';
import { Card, Col, ListGroup, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    productsSetCountInWarehousesBySku,
    productsSetSkusWithLowInventory,
} from '../../../products/slice/productsSlice';
import {
    getProductCountInWarehousesBySku,
    getSkusWithLowInventory,
} from '../../../products/APIs/skusAPI';
export const LowStockAlerts = () => {
    const dispatch = useDispatch();

    const { skusWithLowInventory, countInWarehousesBySku } = useSelector(
        (state) => state.products,
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!skusWithLowInventory.length) {
                    const { data } = await getSkusWithLowInventory();
                    // console.log(data);
                    dispatch(productsSetSkusWithLowInventory(data));

                    const skuIds = data.map((item) => item.id);

                    console.log(skuIds);

                    const { data: countData } =
                        await getProductCountInWarehousesBySku(skuIds);

                    console.log(countData);

                    dispatch(productsSetCountInWarehousesBySku(countData));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    return (
        <ListGroup.Item>
            <Row>
                <h4>Alertas de Stock Bajo</h4>
                {skusWithLowInventory.map((item) => (
                    <Col key={item.id}>
                        <Card className="mb-2 text-dark card-danger h-100">
                            <Card.Header>
                                <Card.Title>
                                    <strong>{item.name}</strong>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body className="">
                                <Card.Text>Sku: {item.sku}</Card.Text>
                                <Card.Text>
                                    Stock mínimo: {item.minimumStock}
                                </Card.Text>
                                <Card.Text>
                                    Quedan: {item.quantity} unidades
                                </Card.Text>
                                {item.quantity !== '0' && (
                                    <div
                                        style={{
                                            maxHeight: '150px',
                                            overflowY: 'auto',
                                        }}
                                    >
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>Bodega</th>
                                                    <th>Cantidad</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {countInWarehousesBySku.map(
                                                    (countData, index) =>
                                                        countData.sku_id ===
                                                            item.id && (
                                                            <tr key={index}>
                                                                <td>
                                                                    {
                                                                        countData.warehouse_name
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        countData.product_count
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ),
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                )}

                                {console.log(item.id, countInWarehousesBySku)}
                            </Card.Body>
                        </Card>
                    </Col>
                    // <div key={item.id} className="low-stock-item">
                    //     {item.name} (Quedan: {item.quantity})
                    // </div>
                ))}
            </Row>
        </ListGroup.Item>
    );
};
