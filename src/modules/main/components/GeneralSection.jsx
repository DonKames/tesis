import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row } from 'react-bootstrap';
import {
    faWarehouse,
    faBuilding,
    faTent,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { getBranchesQty } from '../../locations/APIs/branchesAPI';
import {
    locationsSetBranchLocationsQty,
    locationsSetBranchesQty,
    locationsSetWarehousesQty,
} from '../../locations/slice/locationsSlice';
import { getWarehousesQty } from '../../locations/APIs/warehouseAPI';
import { getBranchLocationsQty } from '../../locations/APIs/apiBranchLocation';
import { getUsersQty } from '../../users/apis/apiUsers';
import { usersSetUsersQty } from '../../users/slice/usersSlice';
import { PieChart } from '../../../shared/ui/components/PieChart';
import { getProductsCountByWarehouse } from '../../products/APIs/apiProducts';
import { productsSetProductsCountByWarehouse } from '../../products/slice/productsSlice';

export const GeneralSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { branchesQty, warehousesQty, branchLocationsQty } = useSelector(
        (state) => state.locations,
    );
    const { mainWarehouse } = useSelector((state) => state.settings);

    const { productsCountByWarehouse } = useSelector((state) => state.products);

    console.log(productsCountByWarehouse);
    const { usersQty } = useSelector((state) => state.users);

    const graphData = productsCountByWarehouse?.map((element) => {
        // console.log(element);
        return [element.warehouse_name || '', parseInt(element.product_count)];
    });

    console.log('productsCountByWarehouse: ', productsCountByWarehouse);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!productsCountByWarehouse.length) {
                    const productsCountByWarehouse =
                        await getProductsCountByWarehouse();

                    console.log(productsCountByWarehouse);
                    dispatch(
                        productsSetProductsCountByWarehouse(
                            productsCountByWarehouse,
                        ),
                    );
                }

                // Quantities
                if (branchesQty === null) {
                    const branchesQty = await getBranchesQty();
                    console.log('GeneralSection branchesQty: ', branchesQty);
                    dispatch(locationsSetBranchesQty(branchesQty));
                }

                if (warehousesQty === null) {
                    const warehousesQty = await getWarehousesQty();
                    dispatch(locationsSetWarehousesQty(warehousesQty));
                }

                if (branchLocationsQty === null) {
                    const branchLocationsQty = await getBranchLocationsQty();
                    dispatch(
                        locationsSetBranchLocationsQty(branchLocationsQty),
                    );
                }

                if (usersQty === null) {
                    const usersQty = await getUsersQty();
                    dispatch(usersSetUsersQty(usersQty));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [
        branchLocationsQty,
        branchesQty,
        productsCountByWarehouse,
        usersQty,
        warehousesQty,
        dispatch,
    ]);

    return (
        <>
            <Card className="shadow h-100 animate__animated animate__fadeIn animate__fast">
                <Card.Header>
                    <h3>Resumen General</h3>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Text className="my-2">
                                <FontAwesomeIcon icon={faBuilding} />
                                Sucursal Principal:
                                <strong> {branchesQty}</strong>
                            </Card.Text>
                            <Card.Text className="my-2">
                                <FontAwesomeIcon icon={faBuilding} />
                                Bodega Principal:
                                <strong> {mainWarehouse?.name}</strong>
                            </Card.Text>
                            <Card.Text className="my-2">
                                <FontAwesomeIcon icon={faBuilding} />
                                Total de Sucursales:
                                <strong> {branchesQty}</strong>
                            </Card.Text>
                            <Card.Text className="my-2">
                                <FontAwesomeIcon icon={faWarehouse} />
                                Total de Bodegas:{' '}
                                <strong>{warehousesQty}</strong>
                            </Card.Text>
                            <Card.Text className="my-2">
                                <FontAwesomeIcon icon={faTent} /> Total de
                                Ubicaciones de Sucursal:{' '}
                                <strong>{branchLocationsQty}</strong>
                            </Card.Text>
                            <Card.Text className="my-2">
                                <FontAwesomeIcon icon={faUser} /> Total de
                                Usuarios: <strong>{usersQty}</strong>
                            </Card.Text>
                        </Col>
                        <Col className="mt-0">
                            <PieChart
                                className="mt-0"
                                data={graphData}
                                title={'Productos por Bodegas'}
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};
