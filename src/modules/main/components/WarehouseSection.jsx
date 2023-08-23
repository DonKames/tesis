import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    getWarehouseById,
    getWarehousesNames,
} from '../../locations/APIs/apiWarehouses';
import { uiSetWarehousesNames } from '../../../shared/ui/uiSlice';

export const WarehouseSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { warehousesNames } = useSelector((state) => state.ui);
    const { mainWarehouse } = useSelector((state) => state.settings);

    // Local States
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const handleWarehouseChange = (e) => {
        // Formatting
        const warehouse = {
            id: +e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        };

        setSelectedWarehouse(warehouse);
    };

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (!warehousesNames.length) {
                    const warehousesData = await getWarehousesNames();
                    dispatch(uiSetWarehousesNames(warehousesData));
                }

                if (mainWarehouse) {
                    const warehouse = await getWarehouseById(mainWarehouse.id);
                    setSelectedWarehouse(warehouse);
                }
            };

            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, mainWarehouse]);

    return (
        <Card className='shadow'>
            <Card.Header>
                <Row>
                    <Col>
                        <h3>Bodegas</h3>
                    </Col>
                    <Col>
                        <Form.Select
                            value={selectedWarehouse?.id}
                            onChange={handleWarehouseChange}
                        >
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
                <Card.Text className=''>
                    Nombre: <strong>{selectedWarehouse?.name}</strong>
                </Card.Text>
                <Card.Text>Sucursal: </Card.Text>
                <Card.Text>
                    Capacidad: <strong>{selectedWarehouse?.address}</strong>
                </Card.Text>
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card>
    );
};
