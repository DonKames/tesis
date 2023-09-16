import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    getWarehouseById,
    getWarehousesNames,
} from '../../locations/APIs/warehouseAPI';
import { uiSetWarehousesNames } from '../../../shared/ui/slice/uiSlice';

export const WarehouseSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { warehousesNames } = useSelector((state) => state.ui);
    const { mainWarehouse } = useSelector((state) => state.settings);

    // Local States
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const handleWarehouseChange = async (e) => {
        // Formatting
        const warehouseId = +e.target.value;

        const warehouseData = await getWarehouseById(warehouseId);

        setSelectedWarehouse(warehouseData);
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
    }, [mainWarehouse]);

    return (
        <Card className="shadow h-100 animate__animated animate__fadeIn animate__fast">
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
                                <option key={warehouse.id} value={warehouse.id}>
                                    {warehouse.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text className="">
                    Nombre: <strong>{selectedWarehouse?.name}</strong>
                </Card.Text>
                <Card.Text>
                    Sucursal: <strong>{selectedWarehouse?.branchId}</strong>
                </Card.Text>
                <Card.Text>
                    Capacidad:{' '}
                    <strong>
                        {selectedWarehouse?.capacity || 'Sin Determinar'}
                    </strong>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
