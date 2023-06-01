import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import SearchProductBar from './SearchProductBar';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../APIs/apiProducts';
import { productsSetProducts, productsSetSkus } from '../slice/productsSlice';
import {
    locationsSetBranches,
    locationsSetWarehouses,
} from '../../locations/slice/locationsSlice';
import { getBranches } from '../../locations/APIs/apiBranches';
import { getWarehouses } from '../../locations/APIs/apiWarehouses';
import { getSkus } from '../APIs/apiSkus';

const ProductsScreen = () => {
    const dispatch = useDispatch();

    const { products, skus } = useSelector((state) => state.products);

    const { branches, warehouses } = useSelector((state) => state.locations);

    useEffect(() => {
        const fetchData = async () => {
            if (!products.length) {
                const fetchedProducts = await getProducts();
                dispatch(productsSetProducts(fetchedProducts));
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
            <Table
                striped
                bordered
                hover
            >
                <thead>
                    <tr>
                        <th>Sku</th>
                        <th>Nombre</th>
                        {/* <th>Sucursal</th>
                        <th>Bodega</th> */}
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
                            {/* <td>
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
                            </td> */}
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
            <Row>
                <Col>
                    <h1>Productos</h1>
                </Col>
            </Row>
            <Table
                striped
                bordered
                hover
            >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </Table>
        </Container>
    );
};

export default ProductsScreen;
