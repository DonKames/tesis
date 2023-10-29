import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    getWarehouseById,
    getWarehousesNames,
} from '../../locations/APIs/warehouseAPI';
import { uiSetWarehousesNames } from '../../../shared/ui/slice/uiSlice';
import { SelectWarehouses } from '../../../shared/ui/components/SelectWarehouses';
import { getProductsQty } from '../../products/APIs/productsAPI';

export const WarehouseSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { warehousesNames, branchesNames } = useSelector((state) => state.ui);
    const { mainWarehouse } = useSelector((state) => state.settings);

    // Local States
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const handleWarehouseChange = async (e) => {
        updateSelectedWarehouse(e.target.value);
        // console.log(e);
        // // Formatting
        // const warehouseId = +e.target.value;

        // console.log(warehouseId);

        // const warehouseData = await getWarehouseById(warehouseId);

        // setSelectedWarehouse(warehouseData);
    };

    const updateSelectedWarehouse = async (warehouseId) => {
        const { data: warehouseData } = await getWarehouseById(warehouseId);
        console.log(warehouseData);

        const { data: productsQty } = await getProductsQty({ warehouseId });

        console.log(productsQty);
        const warehouseDataWithProductsQty = {
            ...warehouseData,
            productsQty,
        };

        setSelectedWarehouse(warehouseDataWithProductsQty);
    };

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (!warehousesNames.length) {
                    const warehousesData = await getWarehousesNames();
                    dispatch(uiSetWarehousesNames(warehousesData));
                }

                if (mainWarehouse) {
                    updateSelectedWarehouse(mainWarehouse.id);
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
                    <Col className="d-flex align-items-center col-auto">
                        <h3 className="mb-0">Bodegas</h3>
                    </Col>
                    <Col>
                        <SelectWarehouses
                            handleInputChange={handleWarehouseChange}
                            name="warehouseId"
                            warehouseId={selectedWarehouse?.id || 0}
                        />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text className="">
                    Nombre: <strong>{selectedWarehouse?.name}</strong>
                </Card.Text>
                <Card.Text>
                    Sucursal:{' '}
                    <strong>
                        {
                            branchesNames.find(
                                (branch) =>
                                    branch.id === selectedWarehouse?.branchId,
                            )?.name
                        }
                    </strong>
                </Card.Text>
                <Card.Text>
                    Capacidad:{' '}
                    <strong>
                        {selectedWarehouse?.capacity || 'Sin Determinar'}
                    </strong>
                </Card.Text>
                <Card.Text>
                    Cantidad de productos:{' '}
                    <strong>
                        {console.log(selectedWarehouse?.productsQty)}
                        {typeof selectedWarehouse?.productsQty === 'number' &&
                        !isNaN(selectedWarehouse?.productsQty)
                            ? selectedWarehouse?.productsQty
                            : 'Sin Determinar'}
                    </strong>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
