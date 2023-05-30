import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import SearchProductBar from './SearchProductBar';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../APIs/apiProducts';
import { productsSetProducts } from '../slice/productsSlice';
import {
    locationsSetBranches,
    locationsSetWarehouses,
} from '../../locations/slice/locationsSlice';
import { getBranches } from '../../locations/APIs/apiBranches';
import { getWarehouses } from '../../locations/APIs/apiWarehouses';

const ProductsScreen = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

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
        };

        fetchData();
    }, [dispatch]);

    return (
        <Container>
            <Row className='mt-3 mb-2'>
                <Col>
                    <h1>Productos</h1>
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
                        <th>Sucursal</th>
                        <th>Bodega</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {/* code to map through product data and render rows */}
                    {products.map((product, index) => (
                        <tr key={product.product_id}>
                            <td>{product.sku}</td>
                            <td>{product.name}</td>
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
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
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
        </Container>
    );
};

export default ProductsScreen;
