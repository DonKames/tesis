import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { getWarehousesNames } from '../../locations/APIs/apiWarehouses';
import { useDispatch } from 'react-redux';
import { locationsSetMainWarehouse } from '../../locations/slice/locationsSlice';

export const SettingsScreen = () => {
    const dispatch = useDispatch();
    const [warehousesNames, setWarehousesNames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!warehousesNames.length) {
                const warehousesData = await getWarehousesNames();
                setWarehousesNames(warehousesData);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleWarehouseChange = (e) => {
        console.log(e.target.value);
        console.log(e.target.options[e.target.selectedIndex].text);
        const mainWarehouse = {
            warehouse_id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        };
        dispatch(locationsSetMainWarehouse(mainWarehouse));
    };

    return (
        <Container>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Card style={{ display: 'inline-block', width: 'auto' }}>
                        <Card.Header>
                            <h3>Configuraciones</h3>
                        </Card.Header>
                        <Card.Body>
                            <Row className='align-items-center'>
                                <Col>
                                    <Card.Text>Bodega Principal: </Card.Text>
                                </Col>
                                <Col>
                                    <Form.Select
                                        onChange={handleWarehouseChange}
                                    >
                                        {warehousesNames.map((warehouse) => (
                                            <option
                                                key={warehouse.warehouse_id}
                                                value={warehouse.warehouse_id}
                                            >
                                                {warehouse.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
