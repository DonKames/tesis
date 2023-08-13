import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Pagination,
} from 'react-bootstrap';
import SearchProductBar from './SearchProductBar';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductsQty } from '../APIs/apiProducts';
import {
    productsSetProductQty,
    productsSetProducts,
    productsSetSkus,
} from '../slice/productsSlice';
import {
    locationsSetBranches,
    locationsSetWarehouses,
} from '../../locations/slice/locationsSlice';
import { getBranches } from '../../locations/APIs/apiBranches';
import { getWarehouses } from '../../locations/APIs/apiWarehouses';
import { getSkus } from '../APIs/apiSkus';

const ProductsScreen = () => {
    const dispatch = useDispatch();

    // Para la paginación.
    const [selectedProductPage, setSelectedProductPage] = useState(1);
    const [productPages, setProductPages] = useState(0);

    const maxPagesToShow = 25;
    const pagesBeforeCurrent = Math.floor(maxPagesToShow / 2);

    const pagesAfterCurrent =
        selectedProductPage < maxPagesToShow / 2
            ? maxPagesToShow - selectedProductPage
            : Math.floor(maxPagesToShow / 2);

    const firstPageToShow = Math.max(
        selectedProductPage - pagesBeforeCurrent,
        1,
    );
    const lastPageToShow = Math.min(
        selectedProductPage + pagesAfterCurrent,
        productPages,
    );

    const { productsQty, products, skus } = useSelector(
        (state) => state.products,
    );

    const { branches, warehouses } = useSelector((state) => state.locations);

    const [limit, setLimit] = useState(20);

    const handlePageChange = async (pageNumber) => {
        setSelectedProductPage(pageNumber);
        const fetchedProducts = await getProducts(pageNumber, limit);
        dispatch(productsSetProducts(fetchedProducts.products));
    };

    useEffect(() => {
        const fetchData = async () => {
            if (productsQty === null) {
                const { productsQty } = await getProductsQty();
                const productPagesQty = productsQty / limit;
                setProductPages(Math.ceil(productPagesQty));
                dispatch(productsSetProductQty(productsQty));
            } else {
                const productPagesQty = productsQty / limit;
                setProductPages(Math.ceil(productPagesQty));
            }

            if (!products?.length) {
                const fetchedData = await getProducts(1, limit);
                console.log(fetchedData);
                dispatch(productsSetProducts(fetchedData.products));
            }

            if (!branches.length) {
                const fetchedBranches = await getBranches();
                dispatch(locationsSetBranches(fetchedBranches));
            }

            if (!warehouses.length) {
                const fetchedWarehouses = await getWarehouses();
                dispatch(locationsSetWarehouses(fetchedWarehouses));
            }

            if (!skus.length) {
                const fetchedSkus = await getSkus();
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
            <Row>
                <Table
                    striped
                    bordered
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
                        <tr>
                            <td>1</td>
                            <td>Producto 1</td>
                            <td>Descripción del producto 1</td>
                            <td>$10.00</td>
                            <td>50</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Col>
                    <h1>Productos</h1>
                </Col>
            </Row>
            <Row>
                <Table
                    striped
                    bordered
                    hover
                >
                    <thead>
                        <tr>
                            <th>Sku</th>
                            <th>Sucursal</th>
                            <th>Bodega</th>
                            <th>EPC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, index) => (
                            <tr key={product.product_id}>
                                <td>
                                    {
                                        skus.find(
                                            (sku) =>
                                                sku.sku_id ===
                                                product.fk_sku_id,
                                        )?.sku
                                    }
                                </td>
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
                                                warehouse.warehouse_id ===
                                                product.fk_warehouse_id,
                                        )?.name
                                    }
                                </td>
                                <td>{product.epc}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Pagination>
                        <Pagination.First onClick={() => handlePageChange(1)} />
                        <Pagination.Prev
                            onClick={() =>
                                handlePageChange(selectedProductPage - 1)
                            }
                        />

                        {firstPageToShow > 1 && <Pagination.Ellipsis />}
                        {[
                            ...Array(
                                lastPageToShow - firstPageToShow + 1,
                            ).keys(),
                        ].map((page) => (
                            <Pagination.Item
                                key={page + firstPageToShow}
                                active={
                                    page + firstPageToShow ===
                                    selectedProductPage
                                }
                                onClick={() =>
                                    handlePageChange(page + firstPageToShow)
                                }
                            >
                                {page + firstPageToShow}
                            </Pagination.Item>
                        ))}
                        {lastPageToShow < productPages && (
                            <Pagination.Ellipsis />
                        )}

                        <Pagination.Next
                            onClick={() =>
                                handlePageChange(selectedProductPage + 1)
                            }
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(productPages)}
                        />
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductsScreen;
