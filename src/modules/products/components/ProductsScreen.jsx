import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Modal,
    Form,
} from 'react-bootstrap';
import SearchProductBar from './SearchProductBar';
import { useForm } from '../../../hooks/useForm';
import { useDispatch } from 'react-redux';

const ProductsScreen = () => {
    const dispatch = useDispatch();

    const [formValues, handleInputChange, reset] = useForm({
        Name: 'camilo@hotmail.com',
        Description: 'La descripción del producto',
        Price: '123456',
        Qty: '123456',
        Sku: '123456',
        Lote: '123456',
        Order: '123456',
    });

    const { Name, Description, Price, Qty, Sku, Lote, Order } = formValues;

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
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {/* code to map through product data and render rows */}
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
