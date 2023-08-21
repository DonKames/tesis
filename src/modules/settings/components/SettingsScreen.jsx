import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { getWarehousesNames } from '../../locations/APIs/apiWarehouses';
import { useDispatch, useSelector } from 'react-redux';
import { settingsSetMainWarehouse } from '../slice/settingsSlice';
import {
    createGlobalSettings,
    updateGlobalSettings,
} from '../APIs/settingsApi';

export const SettingsScreen = () => {
    const dispatch = useDispatch();

    // Redux state
    const { globalSettingsId, mainWarehouse } = useSelector(
        (state) => state.settings,
    );
    const [warehousesNames, setWarehousesNames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!warehousesNames.length) {
                const warehousesData = await getWarehousesNames();
                setWarehousesNames(warehousesData);
            }
        };

        fetchData();
    }, [warehousesNames]);

    const handleWarehouseChange = (e) => {
        console.log(e.target.value);

        console.log(e.target.options[e.target.selectedIndex].text);
        const mainWarehouse = {
            warehouse_id: +e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        };
        console.log(mainWarehouse);

        try {
            if (!globalSettingsId) {
                createGlobalSettings(mainWarehouse);
            } else {
                updateGlobalSettings(
                    mainWarehouse.warehouse_id,
                    globalSettingsId,
                );
            }

            dispatch(settingsSetMainWarehouse(mainWarehouse));
        } catch (error) {
            console.log(error);
        }
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
                                        value={mainWarehouse}
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
