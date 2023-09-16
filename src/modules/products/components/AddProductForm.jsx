import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useForm } from '../../../hooks/useForm';
import { productsSetProducts, productsSetSkus } from '../slice/productsSlice';
import { getSkus } from '../APIs/skusAPI';
import Swal from 'sweetalert2';
import { createProduct, getProducts } from '../APIs/productsAPI';

export const AddProductForm = () => {
    const dispatch = useDispatch();

    const [isValidSku, setIsValidSku] = useState(false);

    const { branches } = useSelector((state) => state.locations);

    const { skus } = useSelector((state) => state.products);

    const branchOptions = branches.map((branch) => ({
        value: branch.branch_id,
        label: branch.name,
    }));

    const [formValues, handleInputChange] = useForm({
        fkSku: '',
        epc: '',
    });

    const { epc, fkSku } = formValues;

    const handleBranchChange = (selectedOption) => {
        handleInputChange({
            target: {
                name: 'branchId',
                value: selectedOption ? selectedOption.value : '',
            },
        });
    };

    const handleSkuChange = (e) => {
        const { name, value } = e.target;

        if (name === 'fkSku') {
            const sku = skus?.find((sku) => {
                console.log(sku.sku, value);
                return sku.sku === value;
            });
            console.log(sku);
            setIsValidSku(!!sku);
        }

        handleInputChange(e);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!skus?.length) {
                const fetchedSkus = await getSkus(1, 10);
                dispatch(productsSetSkus(fetchedSkus));
            }
        };
        fetchData();
    }, [dispatch, skus]);

    const handleAddProduct = async () => {
        if (isValidSku) {
            const response = await createProduct(formValues);

            const { products } = await getProducts();
            dispatch(productsSetProducts(products));

            if (response) {
                console.log('Producto creado');
                console.log(response);

                Swal.fire({
                    icon: 'success',
                    title: 'Producto creado con éxito',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } else {
            console.log('El producto no existe');
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el producto',
                text: 'El sku no existe',
            });
        }
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Agregar Producto</Card.Title>
                <Form>
                    <Form.Group>
                        <Row className="justify-content-between">
                            <Col>
                                <Form.Label>Código SKU</Form.Label>
                            </Col>
                            <Col className="text-end">
                                <Form.Label>
                                    {isValidSku ? (
                                        <span
                                            style={{
                                                color: 'green',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            El sku existe
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                color: 'red',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            El sku no existe
                                        </span>
                                    )}
                                </Form.Label>
                            </Col>
                        </Row>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el Sku del producto"
                            name="fkSku"
                            value={fkSku}
                            onChange={handleSkuChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sucursal</Form.Label>
                        <Select
                            isSearchable
                            placeholder="Seleccione la Sucursal"
                            name="branchId"
                            options={branchOptions}
                            onChange={handleBranchChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Código Etiqueta (EPC)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el epc para el producto"
                            name="epc"
                            value={epc}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Card.Body>
            <Card.Footer>
                <Button className="btn btn-primary" onClick={handleAddProduct}>
                    Guardar Producto
                </Button>
            </Card.Footer>
        </Card>
    );
};
