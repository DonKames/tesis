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

const ProductsScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productStock, setProductStock] = useState(0);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleAddProduct = () => {
        // code to add new product to database
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
                        <Form.Group controlId='productName'>
                            <Form.Label>Nombre del producto</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ingrese el nombre del producto'
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='productDescription'>
                            <Form.Label>Descripción del producto</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ingrese la descripción del producto'
                                value={productDescription}
                                onChange={(e) =>
                                    setProductDescription(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId='productPrice'>
                            <Form.Label>Precio del producto</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Ingrese el precio del producto'
                                value={productPrice}
                                onChange={(e) =>
                                    setProductPrice(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId='productStock'>
                            <Form.Label>Stock del producto</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Ingrese el stock del producto'
                                value={productStock}
                                onChange={(e) =>
                                    setProductStock(e.target.value)
                                }
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
