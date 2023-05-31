import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from '../../../hooks/useForm';
import { createProduct, getProductBySku } from '../APIs/apiProducts';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../locations/APIs/apiBranches';
import { locationsSetBranches } from '../../locations/slice/locationsSlice';

export const AddProductsScreen = () => {
    const dispatch = useDispatch();

    const [searchedProduct, setSearchedProduct] = useState(null);

    const { branches } = useSelector((state) => state.locations);

    useEffect(() => {
        const fetchData = async () => {
            if (!branches.length) {
                const branches = await getBranches();
                dispatch(locationsSetBranches(branches));
            }
        };
        fetchData();
    }, [getBranches, dispatch]);

    const branchOptions = branches.map((branch) => ({
        value: branch.branch_id,
        label: branch.name,
    }));

    const [formSkuValues, handleSkuInputChange] = useForm({
        name: 'Chaqueta Roja',
        description: 'La descripción del producto',
        price: '10000',
        sku: 'FA654',
        lote: '4444',
        order: '123',
    });

    const { name, description, price, sku, lote, order } = formSkuValues;

    const [formProductValues, handleProductInputChange] = useForm({
        fkSku: '',
        epc: '',
    });

    const { epc, fkSku } = formProductValues;

    const handleAddSku = () => {
        console.log('Agregando Sku');
        const searchProduct = getProductBySku(sku);

        if (!searchProduct) {
            console.log('El producto no existe');
            createProduct(formSkuValues);
        }
    };

    const handleBranchChange = (selectedOption) => {
        handleProductInputChange({
            target: {
                name: 'branchId',
                value: selectedOption ? selectedOption.value : '',
            },
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Agregar Productos</h1>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Agregar SKU</Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label>SKU del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el SKU para el producto'
                                        name='sku'
                                        value={sku}
                                        onChange={handleSkuInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nombre del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el nombre del producto'
                                        name='name'
                                        value={name}
                                        onChange={handleSkuInputChange}
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
                                        onChange={handleSkuInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Precio del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el precio del producto'
                                        name='price'
                                        value={price}
                                        onChange={handleSkuInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Lote del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el lote del producto'
                                        name='lote'
                                        value={lote}
                                        onChange={handleSkuInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Orden del producto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el orden del producto'
                                        name='order'
                                        value={order}
                                        onChange={handleSkuInputChange}
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                className='btn btn-primary'
                                onClick={handleAddSku}
                            >
                                Guardar Producto
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <h1>Agregar Productos</h1>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Agregar Producto</Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Código SKU</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el Sku del producto'
                                        name='name'
                                        value={fkSku}
                                        onChange={handleProductInputChange}
                                    />

                                    {searchedProduct &&
                                        (searchedProduct ? (
                                            <span style={{ color: 'green' }}>
                                                El producto existe
                                            </span>
                                        ) : (
                                            <span style={{ color: 'red' }}>
                                                El producto no existe
                                            </span>
                                        ))}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Sucursal</Form.Label>
                                    <Select
                                        isSearchable
                                        placeholder='Seleccione la Sucursal'
                                        name='fk_branch_id'
                                        options={branchOptions}
                                        onChange={handleBranchChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Código Etiqueta (EPC)
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el epc para el producto'
                                        name='name'
                                        value={epc}
                                        onChange={handleProductInputChange}
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                className='btn btn-primary'
                                onClick={handleAddSku}
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
