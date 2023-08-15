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

export const LocationsScreen = () => {
    const dispatch = useDispatch();

    // Pagination
    // Branches
    const [selectedBranchPage, setSelectedBranchPage] = useState(1);
    const [branchPagesQty, setBranchPagesQty] = useState(0);
    const [branchLimit, setBranchLimit] = useState(10);

    const maxPagesToShowBranch = 25;
    const pagesBeforeCurrentBranch = Math.floor(maxPagesToShowBranch / 2);
    const pagesAfterCurrentBranch =
        selectedBranchPage < maxPagesToShowBranch / 2
            ? maxPagesToShowBranch - selectedBranchPage
            : Math.ceil(maxPagesToShowBranch / 2) - 1;

    const firstPageToShowBranch = Math.max(
        selectedBranchPage - pagesBeforeCurrentBranch,
        1,
    );
    const lastPageToShowBranch = Math.min(
        selectedBranchPage + pagesAfterCurrentBranch,
        branchPagesQty,
    );

    const handlePageChangeBranch = async (pageNumber) => {
        setSelectedBranchPage(pageNumber);

        const fetchedBranches = await getBranches(pageNumber, branchLimit);
        dispatch(locationsSetBranches(fetchedBranches));
    };

    // Warehouses Pagination
    const [selectedWarehousePage, setSelectedWarehousePage] = useState(1);
    const [warehousePagesQty, setWarehousePagesQty] = useState(0);
    const [warehouseLimit, setWarehouseLimit] = useState(10);

    const maxPagesToShowWarehouse = 13;
    const pagesBeforeCurrentWarehouse = Math.floor(maxPagesToShowWarehouse / 2);
    const pagesAfterCurrentWarehouse =
        selectedWarehousePage < maxPagesToShowWarehouse / 2
            ? maxPagesToShowWarehouse - selectedWarehousePage
            : Math.ceil(maxPagesToShowWarehouse / 2) - 1;

    const firstPageToShowWarehouse = Math.max(
        selectedWarehousePage - pagesBeforeCurrentWarehouse,
        1,
    );
    const lastPageToShowWarehouse = Math.min(
        selectedWarehousePage + pagesAfterCurrentWarehouse,
        warehousePagesQty,
    );

    const handlePageChangeWarehouse = async (pageNumber) => {
        setSelectedWarehousePage(pageNumber);

        const fetchedWarehouses = await getWarehouses(
            pageNumber,
            warehouseLimit,
        );
        dispatch(locationsSetWarehouses(fetchedWarehouses));
    };

    // Branch Locations Pagination
    const [selectedBranchLocationPage, setSelectedBranchLocationPage] =
        useState(1);
    const [branchLocationPagesQty, setBranchLocationPagesQty] = useState(0);
    const [branchLocationLimit, setBranchLocationLimit] = useState(10);

    const maxPagesToShowBranchLocation = 13;
    const pagesBeforeCurrentBranchLocation = Math.floor(
        maxPagesToShowBranchLocation / 2,
    );
    const pagesAfterCurrentBranchLocation =
        selectedBranchLocationPage < maxPagesToShowBranchLocation / 2
            ? maxPagesToShowBranchLocation - selectedBranchLocationPage
            : Math.ceil(maxPagesToShowBranchLocation / 2) - 1;

    const firstPageToShowBranchLocation = Math.max(
        selectedBranchLocationPage - pagesBeforeCurrentBranchLocation,
        1,
    );
    const lastPageToShowBranchLocation = Math.min(
        selectedBranchLocationPage + pagesAfterCurrentBranchLocation,
        branchLocationPagesQty,
    );

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
                setBranchPagesQty(Math.ceil(branchesQty / branchLimit));
                dispatch(locationsSetBranchesQty(branchesQty));
            } else {
                setBranchPagesQty(Math.ceil(branchesQty / branchLimit));
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
                setWarehousePagesQty(Math.ceil(warehousesQty / warehouseLimit));
                dispatch(locationsSetWarehousesQty(warehousesQty));
            } else {
                setWarehousePagesQty(Math.ceil(warehousesQty / warehouseLimit));
                const fetchedWarehouses = await getWarehouses(
                    1,
                    warehouseLimit,
                );
                dispatch(locationsSetWarehouses(fetchedWarehouses));
            }

            if (!warehouses.length) {
                const fetchedWarehouses = await getWarehouses(
                    1,
                    warehouseLimit,
                );
                dispatch(locationsSetWarehouses(fetchedWarehouses));
            }

            // Branch Locations Table, Pagination.
            if (branchLocationsQty === null) {
                const branchLocationsQty = await getBranchLocationsQty();
                console.log(branchLocationsQty);
                setBranchLocationPagesQty(
                    Math.ceil(branchLocationsQty / branchLocationLimit),
                );
                dispatch(locationsSetBranchLocationsQty(branchLocationsQty));
            } else {
                setBranchLocationPagesQty(
                    Math.ceil(branchLocationsQty / branchLocationLimit),
                );
                const fetchedBranchLocations = await getBranchLocations(
                    1,
                    branchLocationLimit,
                );
                dispatch(locationsSetBranchLocations(fetchedBranchLocations));
            }

            if (!branchLocations.length) {
                const fetchedBranchLocations = await getBranchLocations(
                    1,
                    branchLocationLimit,
                );
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
                    <Card className='shadow'>
                        <Table
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
                        <Row className='mt-2'>
                            <Col className='d-flex justify-content-center'>
                                <Pagination>
                                    <Pagination.First
                                        onClick={() =>
                                            handlePageChangeBranch(1)
                                        }
                                    />
                                    <Pagination.Prev
                                        onClick={() =>
                                            handlePageChangeBranch(
                                                selectedBranchPage - 1,
                                            )
                                        }
                                    />
                                    {firstPageToShowBranch > 1 && (
                                        <Pagination.Ellipsis />
                                    )}
                                    {Array.from(
                                        {
                                            length:
                                                lastPageToShowBranch -
                                                firstPageToShowBranch +
                                                1,
                                        },
                                        (_, i) => firstPageToShowBranch + i,
                                    ).map((page) => (
                                        <Pagination.Item
                                            key={page}
                                            active={page === selectedBranchPage}
                                            onClick={() =>
                                                handlePageChangeBranch(page)
                                            }
                                        >
                                            {page}
                                        </Pagination.Item>
                                    ))}
                                    {lastPageToShowBranch < branchPagesQty && (
                                        <Pagination.Ellipsis />
                                    )}
                                    <Pagination.Next
                                        onClick={() =>
                                            handlePageChangeBranch(
                                                selectedBranchPage + 1,
                                            )
                                        }
                                    />
                                    <Pagination.Last
                                        onClick={() =>
                                            handlePageChangeBranch(
                                                branchPagesQty,
                                            )
                                        }
                                    />
                                </Pagination>
                            </Col>
                        </Row>
                    </Card>
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
                        <Card className='mb-3 shadow'>
                            <Table
                                striped
                                hover
                            >
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
                            <Row>
                                <Col className='d-flex justify-content-center'>
                                    <Pagination>
                                        <Pagination.First
                                            onClick={() =>
                                                handlePageChangeWarehouse(1)
                                            }
                                        />
                                        <Pagination.Prev
                                            onClick={() =>
                                                handlePageChangeWarehouse(
                                                    selectedWarehousePage - 1,
                                                )
                                            }
                                        />
                                        {firstPageToShowWarehouse > 1 && (
                                            <Pagination.Ellipsis />
                                        )}
                                        {Array.from(
                                            {
                                                length:
                                                    lastPageToShowWarehouse -
                                                    firstPageToShowWarehouse +
                                                    1,
                                            },
                                            (_, i) =>
                                                firstPageToShowWarehouse + i,
                                        ).map((page) => (
                                            <Pagination.Item
                                                key={page}
                                                active={
                                                    page ===
                                                    selectedWarehousePage
                                                }
                                                onClick={() =>
                                                    handlePageChangeWarehouse(
                                                        page,
                                                    )
                                                }
                                            >
                                                {page}
                                            </Pagination.Item>
                                        ))}
                                        {lastPageToShowWarehouse <
                                            warehousePagesQty && (
                                            <Pagination.Ellipsis />
                                        )}
                                        <Pagination.Next
                                            onClick={() =>
                                                handlePageChangeWarehouse(
                                                    selectedWarehousePage + 1,
                                                )
                                            }
                                        />
                                        <Pagination.Last
                                            onClick={() =>
                                                handlePageChangeWarehouse(
                                                    warehousePagesQty,
                                                )
                                            }
                                        />
                                    </Pagination>
                                </Col>
                            </Row>
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
                        <Card className='shadow'>
                            <Table
                                striped
                                hover
                            >
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
                                                    )?.name
                                                }
                                            </td>
                                            <td>
                                                {branchLocation.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Row className='mt-2'>
                                <Col className='d-flex justify-content-center'>
                                    <Pagination>
                                        <Pagination.First
                                            onClick={() =>
                                                handlePageChangeBranchLocation(
                                                    1,
                                                )
                                            }
                                        />
                                        <Pagination.Prev
                                            onClick={() =>
                                                handlePageChangeBranchLocation(
                                                    selectedBranchLocationPage -
                                                        1,
                                                )
                                            }
                                        />
                                        {firstPageToShowBranchLocation > 1 && (
                                            <Pagination.Ellipsis />
                                        )}
                                        {Array.from(
                                            {
                                                length:
                                                    lastPageToShowBranchLocation -
                                                    firstPageToShowBranchLocation +
                                                    1,
                                            },
                                            (_, i) =>
                                                firstPageToShowBranchLocation +
                                                i,
                                        ).map((page) => (
                                            <Pagination.Item
                                                key={page}
                                                active={
                                                    page ===
                                                    selectedBranchLocationPage
                                                }
                                                onClick={() =>
                                                    handlePageChangeBranchLocation(
                                                        page,
                                                    )
                                                }
                                            >
                                                {page}
                                            </Pagination.Item>
                                        ))}
                                        {lastPageToShowBranchLocation <
                                            branchLocationPagesQty && (
                                            <Pagination.Ellipsis />
                                        )}
                                        <Pagination.Next
                                            onClick={() =>
                                                handlePageChangeBranchLocation(
                                                    selectedBranchLocationPage +
                                                        1,
                                                )
                                            }
                                        />
                                        <Pagination.Last
                                            onClick={() =>
                                                handlePageChangeBranchLocation(
                                                    branchLocationPagesQty,
                                                )
                                            }
                                        />
                                    </Pagination>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};
