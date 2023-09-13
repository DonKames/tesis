import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    getSettingsData,
    updateMainBranch,
    updateMainWarehouse,
} from '../services/settingsServices';
import { uiSetBranchesNames } from '../../../shared/ui/slice/uiSlice';

export const SettingsScreen = () => {
    const dispatch = useDispatch();

    // Redux states
    const { globalSettingsId, mainWarehouse, mainBranch } = useSelector(
        (state) => state.settings,
    );

    // Local states
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const { branchesNames } = useSelector((state) => state.ui);

    console.log(mainWarehouse);

    const [warehousesNames, setWarehousesNames] = useState([]);
    const [isChangesSaved, setIsChangesSaved] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!warehousesNames.length) {
                const { warehousesData, branchesData } =
                    await getSettingsData();
                setWarehousesNames(warehousesData);
                dispatch(uiSetBranchesNames(branchesData));
            }
        };

        if (mainWarehouse) {
            setSelectedWarehouse(mainWarehouse);
        }

        if (mainBranch) {
            setSelectedBranch(mainBranch);
        }

        fetchData();
    }, [mainWarehouse, mainBranch]);

    const handleMainBranchChange = async (e) => {
        const mainBranch = {
            id: +e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        };

        setSelectedBranch(mainBranch);

        const success = await updateMainBranch(
            mainBranch,
            globalSettingsId,
            selectedWarehouse,
            dispatch,
        );
        saveChanges(success);
    };

    const handleMainWarehouseChange = async (e) => {
        const mainWarehouse = {
            id: +e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        };

        setSelectedWarehouse(mainWarehouse);

        const success = await updateMainWarehouse(
            mainWarehouse,
            globalSettingsId,
            selectedBranch,
            dispatch,
        );
        saveChanges(success);
    };

    const saveChanges = (success) => {
        setIsChangesSaved(success);

        setTimeout(() => {
            setIsChangesSaved(null);
        }, 3000);
    };

    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Card
                        style={{ display: 'inline-block', width: 'auto' }}
                        className="shadow animate__animated animate__fadeIn animate__fast"
                    >
                        <Card.Header>
                            <h3>Configuraciones</h3>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center mb-3">
                                <Col>
                                    <Card.Text>Sucursal Principal: </Card.Text>
                                </Col>
                                <Col>
                                    <Form.Select
                                        onChange={handleMainBranchChange}
                                        value={mainBranch?.id || ''}
                                    >
                                        {branchesNames.map((branch) => (
                                            <option
                                                key={branch.id}
                                                value={branch.id}
                                            >
                                                {branch.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className="align-items-center mb-3">
                                <Col>
                                    <Card.Text>Bodega Principal: </Card.Text>
                                </Col>
                                <Col>
                                    <Form.Select
                                        onChange={handleMainWarehouseChange}
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
                                    isChangesSaved === null
                                        ? 'text-primary animate__animated animate__fadeIn'
                                        : isChangesSaved
                                        ? 'text-success animate__animated animate__shakeX'
                                        : 'text-danger animate__animated animate__shakeX'
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
