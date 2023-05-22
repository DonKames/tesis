import React from 'react';

import { Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { AddBranchModal } from './AddBranchModal';
import { AddWarehouseModal } from './AddWarehouseModal';

export const LocationsScreen = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const countries = await getCountries();
    //         dispatch(locationsSetCountries(countries));

    //         const regions = await getRegions();
    //         dispatch(locationsSetRegions(regions));
    //     };
    //     fetchData();
    // }, []);

    return (
        <Container
            fluid
            className='mt-2'
        >
            <Row className='align-items-center'>
                <Col
                    xs='12'
                    md='6'
                >
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
            </Row>
        </Container>
    );
};
