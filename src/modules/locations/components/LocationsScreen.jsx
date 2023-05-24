import React, { useEffect } from 'react';

import { Col, Container, Row, Table } from 'react-bootstrap';

import { AddBranchModal } from './AddBranchModal';
import { AddWarehouseModal } from './AddWarehouseModal';
import { useDispatch } from 'react-redux';
import { getCountries } from '../APIs/apiCountries';
import {
    locationsSetBranches,
    locationsSetCountries,
    locationsSetRegions,
} from '../slice/locationsSlice';
import { getRegions } from '../APIs/apiRegions';
import { getBranches } from '../APIs/apiBranches';
import { AddBranchLocationModal } from './AddBranchLocationModal';

export const LocationsScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const countries = await getCountries();
            dispatch(locationsSetCountries(countries));
            const regions = await getRegions();
            dispatch(locationsSetRegions(regions));
            const branches = await getBranches();
            dispatch(locationsSetBranches(branches));
        };
        fetchData();
    }, []);

    return (
        <Container
            fluid
            className='mt-2'
        >
            <Row className='align-items-center'>
                <Col className='mb-3'>
                    <Row>
                        <Col>
                            <h1>Sucursales</h1>
                        </Col>
                        <Col className='text-center'>
                            <AddBranchModal />
                        </Col>
                    </Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>Haya yay</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Yay</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Row>
                    <Col
                        xs='12'
                        md='6'
                    >
                        <Row>
                            <Col>
                                <h1>Bodegas</h1>
                            </Col>
                            <Col>
                                <AddWarehouseModal />
                            </Col>
                        </Row>
                        <Table>
                            <thead>
                                <tr>
                                    <th>bodega</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>bodega</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col
                        xs='12'
                        md='6'
                    >
                        <Row>
                            <Col>
                                <h1>Lugares de Sucursal</h1>
                            </Col>
                            <Col>
                                <AddBranchLocationModal />
                            </Col>
                        </Row>
                        <Table>
                            <thead>
                                <tr>
                                    <th>bodega</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>bodega</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};
