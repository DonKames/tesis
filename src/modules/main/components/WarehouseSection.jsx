import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getWarehouses } from '../../locations/APIs/apiWarehouses';
import { locationsSetWarehouses } from '../../locations/slice/locationsSlice';

export const WarehouseSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { warehouses, mainWarehouse } = useSelector(
        (state) => state.locations,
    );

    // Local States
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (!warehouses.length) {
                    const warehousesData = await getWarehouses();
                    dispatch(locationsSetWarehouses(warehousesData));
                }

                if (selectedWarehouse === null) {
                    locationsSetWarehouses(mainWarehouse);
                }
            };

            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    return (
        <Card>
            <Card.Header>
                <Row>
                    <Col>
                        <h3>Bodegas</h3>
                    </Col>
                    <Col>
                        <Form.Select>
                            {warehouses.map((warehouse) => (
                                <option key={warehouse.id}>
                                    {warehouse.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>Nombre: {selectedWarehouse?.name}</Card.Text>
                <Card.Text>Dirección: </Card.Text>
                <Card.Text>Sucursal: </Card.Text>
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card>
    );
};
