import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getWarehousesNames } from '../../locations/APIs/apiWarehouses';
import { uiSetWarehousesNames } from '../../../shared/ui/uiSlice';

export const WarehouseSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { warehousesNames } = useSelector((state) => state.ui);

    // Local States
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (!warehousesNames.length) {
                    const warehousesData = await getWarehousesNames();
                    dispatch(uiSetWarehousesNames(warehousesData));
                }

                // if (selectedWarehouse === null) {
                //     locationsSetWarehouses(mainWarehouse);
                // }
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
                            {warehousesNames.map((warehouse) => (
                                <option
                                    key={warehouse.id}
                                    value={warehouse.id}
                                >
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
