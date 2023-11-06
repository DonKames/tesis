import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
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
import {
    productsSetProductQty,
    productsSetProductsCountByWarehouse,
} from '../../products/slice/productsSlice';
import {
    getProductsCountByWarehouse,
    getProductsQty,
} from '../../products/APIs/productsAPI';

export const GeneralSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { branchesQty, warehousesQty, branchLocationsQty } = useSelector(
        (state) => state.locations,
    );
    const { mainBranch, mainWarehouse } = useSelector(
        (state) => state.settings,
    );

    const { productsCountByWarehouse, productsQty } = useSelector(
        (state) => state.products,
    );

    const { usersQty } = useSelector((state) => state.users);

    // console.log(productsCountByWarehouse);

    const graphData = productsCountByWarehouse?.map((element) => {
        //
        return [element.warehouseName || '', parseInt(element.qty)];
    });

    // console.log(graphData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (productsQty === null) {
                    const { data } = await getProductsQty({});

                    console.log('data', data);

                    dispatch(productsSetProductQty(data));
                }

                if (!productsCountByWarehouse.length) {
                    const productsCountByWarehouse =
                        await getProductsCountByWarehouse();

                    dispatch(
                        productsSetProductsCountByWarehouse(
                            productsCountByWarehouse,
                        ),
                    );
                }

                // Quantities
                if (branchesQty === null) {
                    const { data } = await getBranchesQty({});

                    dispatch(locationsSetBranchesQty(data));
                }

                if (warehousesQty === null) {
                    const { data } = await getWarehousesQty();
                    dispatch(locationsSetWarehousesQty(data));
                }

                if (branchLocationsQty === null) {
                    // console.log(response);
                    const { data } = await getBranchLocationsQty({});
                    dispatch(locationsSetBranchLocationsQty(data));
                }

                if (usersQty === null) {
                    const { data } = await getUsersQty({});
                    dispatch(usersSetUsersQty(data));
                }
            } catch (error) {}
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
                <Card.Header className="d-flex align-items-center my-3">
                    <h3 className="mb-0">Resumen General</h3>
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                    <Row>
                        <Col xs={12} md={6}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Row className="align-items-center my-1 p-0">
                                        <Col
                                            xs={1}
                                            className="px-1 text-center"
                                        >
                                            <FontAwesomeIcon
                                                icon={faBuilding}
                                                className=""
                                            />
                                        </Col>
                                        <Col xs={5} className="ps-0">
                                            <Card.Text>
                                                Sucursal Principal
                                            </Card.Text>
                                        </Col>
                                        <Col xs={1} className="ps-0">
                                            <Card.Text>:</Card.Text>
                                        </Col>
                                        <Col xs={5} className="ps-0">
                                            <Card.Text>
                                                <strong>
                                                    {' '}
                                                    {mainBranch?.name}
                                                </strong>
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row className="align-items-center my-1">
                                        <Col
                                            xs={1}
                                            className="px-1 text-center"
                                        >
                                            <FontAwesomeIcon
                                                icon={faBuilding}
                                            />
                                        </Col>
                                        <Col xs={5} className="ps-0">
                                            <Card.Text>
                                                Bodega Principal:
                                            </Card.Text>
                                        </Col>

                                        <Col xs={6} className="ps-0">
                                            <Card.Text>
                                                <strong>
                                                    {' '}
                                                    {mainWarehouse?.name}
                                                </strong>
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row className="align-items-center my-1">
                                        <Col
                                            xs={1}
                                            className="px-1 text-center"
                                        >
                                            <FontAwesomeIcon
                                                icon={faBuilding}
                                            />
                                        </Col>
                                        <Col xs={5} className="ps-0">
                                            <Card.Text>
                                                Total de Sucursales:
                                            </Card.Text>
                                        </Col>
                                        <Col xs={6} className="ps-0">
                                            <Card.Text>
                                                <strong> {branchesQty}</strong>
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row className="align-items-center my-1">
                                        <Col
                                            xs={1}
                                            className="px-1 text-center"
                                        >
                                            <FontAwesomeIcon
                                                icon={faWarehouse}
                                            />
                                        </Col>
                                        <Col xs={5} className="ps-0">
                                            <Card.Text>
                                                Total de Bodegas:
                                            </Card.Text>
                                        </Col>
                                        <Col xs={6} className="ps-0">
                                            <Card.Text>
                                                <strong>
                                                    {' '}
                                                    {warehousesQty}
                                                </strong>
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                                <ListGroupItem>
                                    <Row className="align-items-center my-1">
                                        <Col
                                            xs={1}
                                            className="px-1 text-center"
                                        >
                                            <FontAwesomeIcon icon={faTent} />
                                        </Col>
                                        <Col xs={5} className="ps-0">
                                            <Card.Text>
                                                Total de Ubicaciones:{' '}
                                            </Card.Text>
                                        </Col>
                                        <Col xs={6} className="ps-0">
                                            <Card.Text>
                                                <strong>
                                                    {branchLocationsQty}
                                                </strong>
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row className="align-items-center my-1">
                                        <Col
                                            xs={1}
                                            className="px-1 text-center"
                                        >
                                            <FontAwesomeIcon icon={faUser} />
                                        </Col>
                                        <Col xs={5} className="ps-0">
                                            <Card.Text>
                                                Total de Usuarios:{' '}
                                            </Card.Text>
                                        </Col>
                                        <Col xs={6} className="ps-0">
                                            <Card.Text>
                                                <strong>{usersQty}</strong>
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                                <ListGroupItem>
                                    <Row className="align-items-center my-1">
                                        <Col
                                            xs={1}
                                            className="px-1 text-center"
                                        >
                                            <FontAwesomeIcon icon={faUser} />
                                        </Col>
                                        <Col xs={5} className="ps-0">
                                            <Card.Text>
                                                Total de Productos:{' '}
                                            </Card.Text>
                                        </Col>
                                        <Col xs={6} className="ps-0">
                                            <Card.Text>
                                                <strong>{productsQty}</strong>
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
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
