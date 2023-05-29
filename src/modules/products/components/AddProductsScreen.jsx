import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from '../../../hooks/useForm';
import { createProduct } from '../APIs/apiProducts';

export const AddProductsScreen = () => {
    const [formValues, handleInputChange, reset] = useForm({
        name: 'camilo@hotmail.com',
        description: 'La descripción del producto',
        price: '10000',
        // Qty: '150',
        sku: 'FA654',
        lote: '4444',
        order: '123',
    });

    const { name, description, price, qty, sku, lote, order } = formValues;

    const handleAddProduct = () => {
        console.log('Agregando producto');
        createProduct(formValues);
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
                                        name='sku'
                                        value={sku}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nombre del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el nombre del producto'
                                        name='name'
                                        value={name}
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
                                        name='description'
                                        value={description}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Precio del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el precio del producto'
                                        name='price'
                                        value={price}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Stock del producto</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Ingrese el stock del producto'
                                        name='qty'
                                        value={qty}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Lote del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el lote del producto'
                                        name='lote'
                                        value={lote}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Orden del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el orden del producto'
                                        name='order'
                                        value={order}
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
                                Guardar Producto
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
