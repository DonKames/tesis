import React, { useEffect, useState } from 'react';

import { Card, Col, Container, Pagination, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { AddBranchModal } from './AddBranchModal';
import { AddBranchLocationModal } from './AddBranchLocationModal';
import { AddWarehouseModal } from './AddWarehouseModal';
import {
    locationsSetBranchLocations,
    locationsSetBranchLocationsQty,
    locationsSetBranches,
    locationsSetBranchesQty,
    locationsSetCountries,
    locationsSetRegions,
    locationsSetWarehouses,
    locationsSetWarehousesQty,
} from '../slice/locationsSlice';
import { getRegions } from '../APIs/apiRegions';
import { getBranches, getBranchesQty } from '../APIs/apiBranches';
import { getWarehouses, getWarehousesQty } from '../APIs/apiWarehouses';
import { getCountries } from '../APIs/apiCountries';
import {
    getBranchLocations,
    getBranchLocationsQty,
} from '../APIs/apiBranchLocation';
import { BranchesSection } from './BranchesSection';
import { WarehousesSection } from './WarehousesSection';
import { BranchLocationsSection } from './BranchLocationsSection';

export const LocationsScreen = () => {
    const dispatch = useDispatch();

    // Pagination
    // Branches
    const [branchLimit, setBranchLimit] = useState(10);

    const [branchLocationLimit, setBranchLocationLimit] = useState(10);

    const handlePageChangeBranchLocation = async (pageNumber) => {
        setSelectedBranchLocationPage(pageNumber);

        const fetchedBranchLocations = await getBranchLocations(
            pageNumber,
            branchLocationLimit,
        );
        dispatch(locationsSetBranchLocations(fetchedBranchLocations));
    };

    // Redux
    const {
        branches,
        branchesQty,
        regions,
        countries,
        warehouses,
        warehousesQty,
        branchLocations,
        branchLocationsQty,
    } = useSelector((state) => state.locations);

    useEffect(() => {
        const fetchData = async () => {
            // Branches Table, Pagination.
            if (branchesQty === null) {
                const { branchesQty } = await getBranchesQty();
                // setBranchPagesQty(Math.ceil(branchesQty / branchLimit));
                dispatch(locationsSetBranchesQty(branchesQty));
            } else {
                // setBranchPagesQty(Math.ceil(branchesQty / branchLimit));
                const fetchedBranches = await getBranches(1, branchLimit);
                dispatch(locationsSetBranches(fetchedBranches));
            }

            if (!branches.length) {
                const fetchedBranches = await getBranches(1, branchLimit);
                dispatch(locationsSetBranches(fetchedBranches));
            }

            // Warehouses Table, Pagination.
            if (warehousesQty === null) {
                const warehousesQty = await getWarehousesQty();
                // setWarehousePagesQty(Math.ceil(warehousesQty / warehouseLimit));
                dispatch(locationsSetWarehousesQty(warehousesQty));
            } else {
                // setWarehousePagesQty(Math.ceil(warehousesQty / warehouseLimit));
                // const fetchedWarehouses = await getWarehouses(
                //     1,
                //     warehouseLimit,
                // );
                // dispatch(locationsSetWarehouses(fetchedWarehouses));
            }

            if (!warehouses.length) {
                const fetchedWarehouses = await getWarehouses(1, 10);
                dispatch(locationsSetWarehouses(fetchedWarehouses));
            }

            // Branch Locations Table, Pagination.
            if (branchLocationsQty === null) {
                const branchLocationsQty = await getBranchLocationsQty();
                console.log(branchLocationsQty);

                dispatch(locationsSetBranchLocationsQty(branchLocationsQty));
            } else {
                const fetchedBranchLocations = await getBranchLocations(1, 10);
                dispatch(locationsSetBranchLocations(fetchedBranchLocations));
            }

            if (!branchLocations.length) {
                const fetchedBranchLocations = await getBranchLocations(1, 10);
                dispatch(locationsSetBranchLocations(fetchedBranchLocations));
            }

            // Forms
            if (!countries.length) {
                const fetchedCountries = await getCountries();
                dispatch(locationsSetCountries(fetchedCountries));
            }

            if (!regions.length) {
                const fetchedRegions = await getRegions();
                dispatch(locationsSetRegions(fetchedRegions));
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
                    <BranchesSection />
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
                        <WarehousesSection />
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
                        <BranchLocationsSection />
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};
