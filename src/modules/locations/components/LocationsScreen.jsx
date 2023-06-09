import React, { useEffect } from 'react';

import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { AddBranchModal } from './AddBranchModal';
import { AddBranchLocationModal } from './AddBranchLocationModal';
import { AddWarehouseModal } from './AddWarehouseModal';
import {
    locationsSetBranchLocations,
    locationsSetBranches,
    locationsSetCountries,
    locationsSetRegions,
    locationsSetWarehouses,
} from '../slice/locationsSlice';
import { getRegions } from '../APIs/apiRegions';
import { getBranches } from '../APIs/apiBranches';
import { getWarehouses } from '../APIs/apiWarehouses';
import { getCountries } from '../APIs/apiCountries';
import { getBranchLocations } from '../APIs/apiBranchLocation';

export const LocationsScreen = () => {
    const dispatch = useDispatch();

    const { branches, regions, countries, warehouses, branchLocations } =
        useSelector((state) => state.locations);

    useEffect(() => {
        const fetchData = async () => {
            if (!countries.length) {
                const fetchedCountries = await getCountries();
                dispatch(locationsSetCountries(fetchedCountries));
            }

            if (!regions.length) {
                const fetchedRegions = await getRegions();
                dispatch(locationsSetRegions(fetchedRegions));
            }

            if (!branches.length) {
                const fetchedBranches = await getBranches();
                dispatch(locationsSetBranches(fetchedBranches));
            }

            if (!warehouses.length) {
                const fetchedWarehouses = await getWarehouses();
                dispatch(locationsSetWarehouses(fetchedWarehouses));
            }

            if (!branchLocations.length) {
                const fetchedBranchLocations = await getBranchLocations();
                dispatch(locationsSetBranchLocations(fetchedBranchLocations));
            }
        };

        fetchData();
    }, [dispatch]);

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
                    <Table
                        bordered
                        striped
                        hover
                    >
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>País</th>
                                <th>Región</th>
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
                                                    )?.fk_country_id,
                                            )?.name
                                        }
                                    </td>
                                    <td>
                                        {
                                            regions.find(
                                                (region) =>
                                                    region.region_id ===
                                                    branch.fk_region_id,
                                            )?.name
                                        }
                                    </td>
                                    <td>{branch.address}</td>
                                </tr>
                            ))}
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
                        <Card>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Sucursal</th>
                                        <th>Capacidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {warehouses.map((warehouse) => (
                                        <tr key={warehouse.warehouse_id}>
                                            <td>{warehouse.name}</td>
                                            <td>
                                                {
                                                    branches.find(
                                                        (branch) =>
                                                            branch.branch_id ===
                                                            warehouse.fk_branch_id,
                                                    )?.name
                                                }
                                            </td>
                                            <td>{warehouse.capacity} m3</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
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
                        <Card>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Sucursal</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {branchLocations.map((branchLocation) => (
                                        <tr
                                            key={
                                                branchLocation.branch_location_id
                                            }
                                        >
                                            <td>{branchLocation.name}</td>
                                            <td>
                                                {
                                                    branches.find(
                                                        (branch) =>
                                                            branch.branch_id ===
                                                            branchLocation.fk_branch_id,
                                                    ).name
                                                }
                                            </td>
                                            <td>
                                                {branchLocation.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};
