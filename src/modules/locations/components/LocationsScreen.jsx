import React, { useEffect } from 'react';

import { Col, Container, Row, Table } from 'react-bootstrap';

import { AddBranchModal } from './AddBranchModal';
import { AddWarehouseModal } from './AddWarehouseModal';
import { useDispatch, useSelector } from 'react-redux';
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

    const { branches, regions, countries } = useSelector(
        (state) => state.locations,
    );

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
                                <th>Nombre</th>
                                <th>País</th>
                                <th>Region</th>
                                <th>Dirección</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapea las sucursales a filas de la tabla */}
                            {branches.map((branch) => (
                                <tr key={branch.branch_id}>
                                    <td>{branch.name}</td>
                                    <td>
                                        {
                                            countries.find(
                                                (country) =>
                                                    country.country_id ===
                                                    regions.find(
                                                        (region) =>
                                                            region.region_id ===
                                                            branch.fk_region_id,
                                                    ).fk_country_id,
                                            ).name
                                        }
                                    </td>
                                    <td>
                                        {
                                            regions.find(
                                                (region) =>
                                                    region.region_id ===
                                                    branch.fk_region_id,
                                            ).name
                                        }
                                    </td>
                                    <td>{branch.address}</td>
                                </tr>
                            ))}
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
