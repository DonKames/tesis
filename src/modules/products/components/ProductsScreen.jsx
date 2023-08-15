import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Pagination,
    Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

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
import { getBranches } from '../../locations/APIs/apiBranches';
import { getWarehouses } from '../../locations/APIs/apiWarehouses';
import { getSkus, getSkusQty } from '../APIs/apiSkus';
import SearchProductBar from './SearchProductBar';
import usePagination from '../../../hooks/usePagination';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';

const ProductsScreen = () => {
    const dispatch = useDispatch();

    // Redux States
    const { productsQty, products, skus, skusQty } = useSelector(
        (state) => state.products,
    );
    const { branches, warehouses } = useSelector((state) => state.locations);

    // Pagination
    // Skus
    const [selectedSkuPage, setSelectedSkuPage] = useState(1);
    const [skuPagesQty, setSkuPagesQty] = useState(0);
    const [skuLimit, setSkuLimit] = useState(10);

    const maxPagesToShowSku = 25;
    const pagesBeforeCurrentSku = Math.floor(maxPagesToShowSku / 2);
    const pagesAfterCurrentSku =
        selectedSkuPage < maxPagesToShowSku / 2
            ? maxPagesToShowSku - selectedSkuPage
            : Math.floor(maxPagesToShowSku / 2);

    const firstPageToShowSku = Math.max(
        selectedSkuPage - pagesBeforeCurrentSku,
        1,
    );

    const lastPageToShowSku = Math.min(
        selectedSkuPage + pagesAfterCurrentSku,
        skuPagesQty,
    );

    // Sku pagination hook
    console.log(skusQty);
    const {
        selectedPage: selectedPageSku,
        pagesQty: pagesQtySku,
        handlePageChange: handlePageChangeSku,
    } = usePagination(
        getSkus,
        getSkusQty,
        productsSetSkus,
        productsSetSkusQty,
        skusQty,
        skuLimit,
    );

    // Sku table columns

    // Products
    // const [selectedProductPage, setSelectedProductPage] = useState(1);
    // const [productPagesQty, setProductPagesQty] = useState(0);
    const [productLimit, setProductLimit] = useState(20);

    // Products pagination hook
    const {
        selectedPage: selectedPageProduct,
        pagesQty: pagesQtyProduct,
        handlePageChange: handlePageChangeProduct,
    } = usePagination(
        getProducts,
        getProductsQty,
        productsSetProducts,
        productsSetProductQty,
        productsQty,
        productLimit,
    );

    const maxPagesToShow = 25;

    // Products table columns
    const tableColumnsProducts = ['Sku', 'Sucursal', 'Bodega', 'EPC'];

    const productRenderer = (product, index) => (
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

    // const handlePageChange = async (pageNumber) => {
    //     setSelectedProductPage(pageNumber);
    //     const fetchedProducts = await getProducts(pageNumber, productLimit);
    //     dispatch(productsSetProducts(fetchedProducts.products));
    // };

    useEffect(() => {
        const fetchData = async () => {
            if (productsQty === null) {
                const { productsQty } = await getProductsQty();
                const productPagesQty = productsQty / productLimit;
                // setProductPagesQty(Math.ceil(productPagesQty));
                dispatch(productsSetProductQty(productsQty));
            } else {
                const productPagesQty = productsQty / productLimit;
                // setProductPagesQty(Math.ceil(productPagesQty));
            }

            if (!products?.length) {
                const fetchedData = await getProducts(1, productLimit);
                console.log(fetchedData);
                dispatch(productsSetProducts(fetchedData));
            }

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
                const skuPagesQty = skusQty / skuLimit;
                setSkuPagesQty(Math.ceil(skuPagesQty));
                dispatch(productsSetSkusQty(skusQty));
            } else {
                const skuPagesQty = skusQty / skuLimit;

                console.log(skuPagesQty, skusQty);
                setSkuPagesQty(Math.ceil(skuPagesQty));
                // setSkuPagesQty(Math.ceil(pagesQtySku));
            }

            if (!skus.length) {
                const fetchedSkus = await getSkus(1, skuLimit);
                dispatch(productsSetSkus(fetchedSkus));
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

            <Card>
                <Table
                    striped
                    hover
                >
                    <thead>
                        <tr>
                            <th>Sku</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* code to map through product data and render rows */}
                        {skus?.map((sku, index) => (
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Row className=''>
                    <Col
                        className='text-center text-muted'
                        style={{ fontSize: '14px' }}
                    >
                        <p>{`Total de SKUs: ${skusQty} | Páginas totales: ${skuPagesQty}`}</p>
                    </Col>
                </Row>
            </Card>
            <Row className='mt-1'>
                <Col className='d-flex justify-content-center'>
                    <Pagination>
                        <Pagination.First
                            onClick={() => handlePageChangeSku(1)}
                        />
                        <Pagination.Prev
                            onClick={() =>
                                handlePageChangeSku(selectedPageSku - 1)
                            }
                        />
                        {firstPageToShowSku > 1 && <Pagination.Ellipsis />}
                        {Array.from(
                            {
                                length:
                                    lastPageToShowSku - firstPageToShowSku + 1,
                            },
                            (_, i) => firstPageToShowSku + i,
                        ).map((page) => (
                            <Pagination.Item
                                key={page}
                                active={page === selectedPageSku}
                                onClick={() => handlePageChangeSku(page)}
                            >
                                {page}
                            </Pagination.Item>
                        ))}
                        {lastPageToShowSku < skuPagesQty && (
                            <Pagination.Ellipsis />
                        )}
                        <Pagination.Next
                            onClick={() =>
                                handlePageChangeSku(selectedPageSku + 1)
                            }
                        />
                        <Pagination.Last
                            onClick={() => handlePageChangeSku(skuPagesQty)}
                        />
                    </Pagination>
                </Col>
            </Row>
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
            />
        </Container>
    );
};

export default ProductsScreen;
