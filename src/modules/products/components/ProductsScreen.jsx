import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import {
    productsSetProductQty,
    productsSetProducts,
    productsSetSkus,
    productsSetSkusQty,
} from '../slice/productsSlice';
import {
    locationsSetBranches,
    locationsSetWarehouses,
} from '../../locations/slice/locationsSlice';
import { getProducts, getProductsQty } from '../APIs/apiProducts';
import { getBranches } from '../../locations/APIs/branchesAPI';
import { getWarehouses } from '../../locations/APIs/apiWarehouses';
import { getSkus, getSkusQty } from '../APIs/apiSkus';
import SearchProductBar from './SearchProductBar';
import usePagination from '../../../hooks/usePagination';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';

/**
 * Renders a screen that displays a table of SKUs and products with pagination and search functionality.
 *
 * The component fetches data from APIs and updates the Redux store using various functions and actions.
 * It uses the `usePagination` custom hook for handling pagination logic.
 *
 * @returns {JSX.Element} The rendered ProductsScreen component.
 */

const ProductsScreen = () => {
    const dispatch = useDispatch();

    // Redux States
    const { productsQty, products, skus, skusQty } = useSelector(
        (state) => state.products,
    );
    const { branches, warehouses } = useSelector((state) => state.locations);

    // Pagination
    // Skus

    // Sku pagination hook
    const {
        selectedPage: selectedPageSku,
        pagesQty: pagesQtySku,
        handlePageChange: handlePageChangeSku,
        setLimit: setSkuLimit,
        limit: skuLimit,
    } = usePagination(
        getSkus,
        getSkusQty,
        productsSetSkus,
        productsSetSkusQty,
        skusQty,
        10,
    );

    // Sku table columns
    const tableColumnsSkus = [
        'Sku',
        'Nombre',
        'Descripción',
        'Precio',
        'Stock',
        '',
    ];
    const skuRenderer = (sku) => (
        <tr key={sku.sku_id}>
            <td>{sku.sku}</td>

            <td>{sku.name}</td>
            <td>{sku.description}</td>
            <td>
                $
                {sku.price.toLocaleString('es-CL', {
                    maximumFractionDigits: 0,
                })}
            </td>
            <td>
                {skus.reduce((accumulator, obj) => {
                    if (obj.sku === sku.sku) {
                        return accumulator + 1;
                    }
                    return accumulator;
                }, 0)}
            </td>
            <td>
                <Button
                    variant='warning'
                    onClick={() => handleEdit(sku.sku_id)}
                >
                    {/* <Pencil /> */}
                </Button>
                <Button
                    variant='danger'
                    onClick={() => handleDelete(sku.sku_id)}
                >
                    <FontAwesomeIcon icon={faX} />
                    {/* <Trash /> */}
                </Button>
                <FontAwesomeIcon icon={faX} />
            </td>
        </tr>
    );

    // Funciones para manejar las acciones de editar y eliminar
    const handleEdit = (skuId) => {
        // Lógica para editar el SKU con el ID dado
    };

    const handleDelete = (skuId) => {
        // Lógica para eliminar el SKU con el ID dado
    };

    // Products
    // Products pagination hook
    const {
        selectedPage: selectedPageProduct,
        pagesQty: pagesQtyProduct,
        handlePageChange: handlePageChangeProduct,
        limit: productLimit,
        setLimit: setProductLimit,
    } = usePagination(
        getProducts,
        getProductsQty,
        productsSetProducts,
        productsSetProductQty,
        productsQty,
        10,
    );

    // Products table columns
    const tableColumnsProducts = ['Sku', 'Sucursal', 'Bodega', 'EPC', ''];

    const productRenderer = (product) => (
        <tr key={product.product_id}>
            <td>{skus.find((sku) => sku.sku_id === product.fk_sku_id)?.sku}</td>
            <td>
                {
                    branches.find(
                        (branch) =>
                            branch.branch_id ===
                            warehouses.find(
                                (warehouse) =>
                                    warehouse.warehouse_id ===
                                    product.fk_warehouse_id,
                            )?.fk_branch_id,
                    )?.name
                }
            </td>
            <td>
                {
                    warehouses.find(
                        (warehouse) =>
                            warehouse.warehouse_id === product.fk_warehouse_id,
                    )?.name
                }
            </td>
            <td>{product.epc}</td>
        </tr>
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (productsQty === null) {
                    const { productsQty } = await getProductsQty();
                    dispatch(productsSetProductQty(productsQty));
                }

                if (!products?.length) {
                    const fetchedData = await getProducts(1, productLimit);
                    console.log(fetchedData);
                    dispatch(productsSetProducts(fetchedData));
                }

                // UI
                if (!branches.length) {
                    const fetchedBranches = await getBranches();
                    dispatch(locationsSetBranches(fetchedBranches));
                }

                if (!warehouses.length) {
                    const fetchedWarehouses = await getWarehouses();
                    dispatch(locationsSetWarehouses(fetchedWarehouses));
                }

                // Skus pagination, table and data

                if (skusQty === null || skusQty === undefined) {
                    const skusQty = await getSkusQty();
                    console.log(skusQty);
                    // setSkuPagesQty(Math.ceil(skuPagesQty));
                    dispatch(productsSetSkusQty(skusQty));
                } else {
                    const skuPagesQty = skusQty / skuLimit;

                    console.log(skuPagesQty, skusQty);
                    // setSkuPagesQty(Math.ceil(skuPagesQty));
                    // setSkuPagesQty(Math.ceil(pagesQtySku));
                }

                if (!skus.length) {
                    const fetchedSkus = await getSkus(1, 10);
                    dispatch(productsSetSkus(fetchedSkus));
                }
            } catch (error) {
                console.error('Ocurrió un error al obtener los datos:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <Container>
            <Row className='mt-3 mb-2'>
                <Col>
                    <h1>SKUs</h1>
                </Col>
                <Col>
                    <SearchProductBar />
                </Col>
                <Col className='text-end'>
                    <Link to='add'>
                        <Button>Agregar producto</Button>
                    </Link>
                </Col>
            </Row>
            <PaginatedTable
                items={skus}
                columns={tableColumnsSkus}
                selectedPage={selectedPageSku}
                pagesQty={pagesQtySku}
                handlePageChange={handlePageChangeSku}
                itemRenderer={skuRenderer}
                footerText={`Total de SKUs: ${skusQty} | Páginas totales: ${pagesQtySku}`}
                maxPagesToShow={10}
                handleLimitChange={setSkuLimit}
                limit={skuLimit}
            />
            <Row>
                <Col>
                    <h1>Productos</h1>
                </Col>
            </Row>
            <PaginatedTable
                items={products}
                columns={tableColumnsProducts}
                selectedPage={selectedPageProduct}
                pagesQty={pagesQtyProduct}
                handlePageChange={handlePageChangeProduct}
                itemRenderer={productRenderer}
                footerText={`Total de productos: ${productsQty} | Páginas totales: ${pagesQtyProduct}`}
                maxPagesToShow={10}
                handleLimitChange={setProductLimit}
                limit={productLimit}
            />
        </Container>
    );
};

export default ProductsScreen;
