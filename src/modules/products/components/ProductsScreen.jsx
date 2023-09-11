// React
import React, { useEffect } from 'react';

// Dependencies
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Personal
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
import { getSkus, getSkusQty } from '../APIs/skusAPI';
import SearchProductBar from './SearchProductBar';
import { TableSkus } from './TableSkus';
import { TableProducts } from './TableProducts';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (productsQty === null) {
                    const { productsQty } = await getProductsQty();
                    dispatch(productsSetProductQty(productsQty));
                }

                if (!products?.length) {
                    const fetchedData = await getProducts(1, 10);
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

                // if (skusQty === null || skusQty === undefined) {
                //     const { skusQty } = await getSkusQty();
                //     dispatch(productsSetSkusQty(skusQty));
                // }

                if (!skus.length) {
                    const skusData = await getSkus(1, 10);
                    dispatch(productsSetSkus(skusData));
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
                <Col></Col>
                <Col>
                    <SearchProductBar />
                </Col>
                <Col className='text-end'>
                    <Link to='add'>
                        <Button>Agregar producto</Button>
                    </Link>
                </Col>
            </Row>
            <TableSkus />
            {/* <Row>
                <Col>
                    <h1>Productos</h1>
                </Col>
            </Row> */}
            <TableProducts />
        </Container>
    );
};

export default ProductsScreen;
