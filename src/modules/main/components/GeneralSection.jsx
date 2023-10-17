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
import { getBranchLocationsQty } from '../../locations/APIs/branchLocationsAPI';
import { getUsersQty } from '../../users/apis/usersAPI';
import { usersSetUsersQty } from '../../users/slice/usersSlice';
import { PieChart } from '../../../shared/ui/components/PieChart';
import { productsSetProductsCountByWarehouse } from '../../products/slice/productsSlice';
import { getProductsCountByWarehouse } from '../../products/APIs/productsAPI';

export const GeneralSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { branchesQty, warehousesQty, branchLocationsQty } = useSelector(
        (state) => state.locations,
    );
    const { mainBranch, mainWarehouse } = useSelector(
        (state) => state.settings,
    );

    const { productsCountByWarehouse } = useSelector((state) => state.products);

    const { usersQty } = useSelector((state) => state.users);

    const graphData = productsCountByWarehouse?.map((element) => {
        // console.log(element);
        return [element.warehouse_name || '', parseInt(element.product_count)];
    });

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
                <Card.Header className="d-flex align-items-center">
                    <h3 className="mb-0">Resumen General</h3>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12} md={6}>
                            <Row className="align-items-center my-1 p-0">
                                <Col xs={1} className="px-1 text-center">
                                    <FontAwesomeIcon
                                        icon={faBuilding}
                                        className=""
                                    />
                                </Col>
                                <Col xs={11} className="ps-0">
                                    <Card.Text>
                                        Sucursal Principal:
                                        <strong> {mainBranch?.name}</strong>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className="align-items-center my-1">
                                <Col xs={1} className="px-1 text-center">
                                    <FontAwesomeIcon icon={faBuilding} />
                                </Col>
                                <Col xs={11} className="ps-0">
                                    <Card.Text>
                                        Bodega Principal:
                                        <strong> {mainWarehouse?.name}</strong>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className="align-items-center my-1">
                                <Col xs={1} className="px-1 text-center">
                                    <FontAwesomeIcon icon={faBuilding} />
                                </Col>
                                <Col xs={11} className="ps-0">
                                    <Card.Text>
                                        Total de Sucursales:
                                        <strong> {branchesQty}</strong>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className="align-items-center my-1">
                                <Col xs={1} className="px-1 text-center">
                                    <FontAwesomeIcon icon={faWarehouse} />
                                </Col>
                                <Col xs={11} className="ps-0">
                                    <Card.Text>
                                        Total de Bodegas:
                                        <strong> {warehousesQty}</strong>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className="align-items-center my-1">
                                <Col xs={1} className="px-1 text-center">
                                    <FontAwesomeIcon icon={faTent} />
                                </Col>
                                <Col xs={11} className="ps-0">
                                    <Card.Text>
                                        Total de Ubicaciones de Sucursal:{' '}
                                        <strong>{branchLocationsQty}</strong>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className="align-items-center my-1">
                                <Col xs={1} className="px-1 text-center">
                                    <FontAwesomeIcon icon={faUser} />
                                </Col>
                                <Col xs={11} className="ps-0">
                                    <Card.Text>
                                        Total de Usuarios:{' '}
                                        <strong>{usersQty}</strong>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className="align-items-center my-1">
                                <Col xs={1} className="px-1 text-center">
                                    <FontAwesomeIcon icon={faUser} />
                                </Col>
                                <Col xs={11} className="ps-0">
                                    <Card.Text>
                                        Total de Productos:{' '}
                                        <strong>En Trabajo</strong>
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={6} className="mt-0">
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
