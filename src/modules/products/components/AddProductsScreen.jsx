import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from '../../../hooks/useForm';

export const AddProductsScreen = () => {
    const [formValues, handleInputChange, reset] = useForm({
        Name: 'camilo@hotmail.com',
        Description: 'La descripción del producto',
        Price: '$10000',
        // Qty: '150',
        Sku: 'FA654',
        Lote: '4444',
        Order: '123',
    });

    const { name, description, price, qty, sku, lote, order } = formValues;

    const handleAddProduct = () => {
        console.log('Agregando producto');
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Agregar Productos</h1>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Agregar Producto</Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label>SKU del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el SKU del producto'
                                        name='productSku'
                                        value={productSku}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nombre del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el nombre del producto'
                                        name='productName'
                                        value={productName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Descripción del producto
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese la descripción del producto'
                                        name='productDescription'
                                        value={productDescription}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Precio del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el precio del producto'
                                        name='productPrice'
                                        value={productPrice}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Stock del producto</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Ingrese el stock del producto'
                                        name='productQty'
                                        value={productQty}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Lote del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el lote del producto'
                                        name='productLote'
                                        value={productLote}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Orden del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el orden del producto'
                                        name='productOrder'
                                        value={productOrder}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                className='btn btn-primary'
                                onClick={handleAddProduct}
                            >
                                Guarda Producto
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
