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

    console.log(mainWarehouse);

    // const { id: idMainWarehouse, name: nameMainWarehouse } = mainWarehouse;

    const [warehousesNames, setWarehousesNames] = useState([]);
    const [isChangesSaved, setIsChangesSaved] = useState(null);

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
        // Formatting
        const mainWarehouse = {
            id: +e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        };

        // Create or update global settings
        try {
            if (!globalSettingsId) {
                createGlobalSettings(mainWarehouse);
            } else {
                updateGlobalSettings({
                    mainWarehouseId: mainWarehouse.id,
                    globalSettingsId,
                });
                saveChanges(true);
                // setIsChangesSaved(true);
            }
            dispatch(settingsSetMainWarehouse(mainWarehouse));
        } catch (error) {
            saveChanges(false);
            // setIsChangesSaved(false);
            console.log(error);
        }
    };

    const saveChanges = (success) => {
        setIsChangesSaved(success); // Cambia el estado a true o false

        // Programa un cambio de estado a null después de 3 segundos (3000 milisegundos)
        setTimeout(() => {
            setIsChangesSaved(null);
        }, 3000);
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
                                        value={mainWarehouse?.id || ''}
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
                        </Card.Body>
                        <Card.Footer>
                            <Card.Text
                                className={`text-center fw-bold ${
                                    isChangesSaved === null ||
                                    isChangesSaved === true
                                        ? 'text-success'
                                        : 'text-danger'
                                }`}
                            >
                                {isChangesSaved === null
                                    ? 'DataHive - RFWID'
                                    : isChangesSaved
                                    ? 'Cambios guardados'
                                    : 'No se guardaron los cambios'}
                            </Card.Text>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
