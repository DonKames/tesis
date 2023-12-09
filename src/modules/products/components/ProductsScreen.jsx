// React
import React from 'react';

// Dependencies
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Personal
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
    return (
        <Container>
            <Row className="mt-3 mb-2">
                <Col className="text-end">
                    <Link to="add">
                        <Button>Agregar producto</Button>
                    </Link>
                </Col>
            </Row>
            <TableSkus />
            <TableProducts />
        </Container>
    );
};

export default ProductsScreen;
