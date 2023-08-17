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

import { getBranchesQty } from '../../locations/APIs/apiBranches';
import {
    locationsSetBranchLocationsQty,
    locationsSetBranchesQty,
    locationsSetWarehousesQty,
} from '../../locations/slice/locationsSlice';
import { getWarehousesQty } from '../../locations/APIs/apiWarehouses';
import { getBranchLocationsQty } from '../../locations/APIs/apiBranchLocation';
import { getUsersQty } from '../../users/apis/apiUsers';
import { usersSetUsersQty } from '../../users/slice/usersSlice';
import { PieChart } from '../../../shared/ui/components/PieChart';

export const GeneralSection = () => {
    const dispatch = useDispatch();
    // Redux states
    const { branchesQty, warehousesQty, branchLocationsQty } = useSelector(
        (state) => state.locations,
    );

    const { usersQty } = useSelector((state) => state.users);

    // Graphics
    const graphData = [
        { name: 'Sucursales', value: branchesQty },
        { name: 'Bodegas', value: warehousesQty },
        { name: 'Ubicaciones', value: branchLocationsQty },
        { name: 'Usuarios', value: usersQty },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
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
    }, [dispatch]);

    return (
        <>
            <Card className='shadow'>
                <Card.Header>
                    <h3>Resumen General</h3>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faBuilding} /> Cantidad
                                total de Sucursales:
                                <strong> {branchesQty}</strong>
                            </Card.Text>
                            <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faWarehouse} /> Cantidad
                                total de Bodegas:{' '}
                                <strong>{warehousesQty}</strong>
                            </Card.Text>
                            <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faTent} /> Cantidad total
                                de Ubicaciones de Sucursal:{' '}
                                <strong>{branchLocationsQty}</strong>
                            </Card.Text>
                            <Card.Text className='my-2'>
                                <FontAwesomeIcon icon={faUser} /> Cantidad total
                                de Usuarios: <strong>{usersQty}</strong>
                            </Card.Text>
                        </Col>
                        <Col>
                            <PieChart data={graphData} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};
