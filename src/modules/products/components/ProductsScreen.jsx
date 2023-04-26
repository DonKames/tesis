import React, { useState } from 'react';
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
// import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

const ProductsScreen = () => {
    // const dispatch = useDispatch();

    const [formValues, handleInputChange, reset] = useForm({
        productName: 'camilo@hotmail.com',
        productDescription: 'La descripción del producto',
        productPrice: '123456',
        productQty: '123456',
        productSku: '123456',
        productLote: '123456',
        productOrder: '123456',
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
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleAddProduct = () => {
        // code to add new product to database

        console.log(formValues);
        reset();
        handleCloseModal();
    };

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
                    <Button onClick={handleShowModal}>Agregar producto</Button>
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
            <Modal
                show={showModal}
                onHide={handleCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
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
                            <Form.Label>Descripción del producto</Form.Label>
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
                                type='number'
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
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleCloseModal}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant='primary'
                        onClick={handleAddProduct}
                    >
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProductsScreen;
