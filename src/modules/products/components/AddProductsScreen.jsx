import React from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from '../../../hooks/useForm';

export const AddProductsScreen = () => {
    const [formValues, handleInputChange, reset] = useForm({
        productName: 'camilo@hotmail.com',
        productDescription: 'La descripción del producto',
        productPrice: '$10000',
        productQty: '150',
        productSku: 'FA654',
        productLote: '4444',
        productOrder: '123',
    });

    const {
        productName,
        productDescription,
        productPrice,
        productQty,
        productSku,
        productLote,
        productOrder,
    } = formValues;

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Add Products</h1>
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
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
