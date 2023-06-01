import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from '../../../hooks/useForm';
import Swal from 'sweetalert2';
import { createSku, getSkuBySku } from '../APIs/apiSkus';

export const AddSkuForm = () => {
    const [formSkuValues, handleSkuInputChange] = useForm({
        name: 'Chaqueta Roja',
        description: 'La descripción del producto',
        price: '10000',
        sku: 'FA654',
        lote: '4444',
        order: '123',
    });

    const { name, description, price, sku, lote, order } = formSkuValues;

    const handleAddSku = async () => {
        console.log('Agregando Sku');
        const searchProduct = await getSkuBySku(sku);

        if (!searchProduct.length) {
            console.log('El producto no existe');
            const response = await createSku(formSkuValues);

            if (response) {
                console.log('Producto creado');
                console.log(response);

                Swal.fire({
                    icon: 'success',
                    title: 'Producto creado con éxito',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                console.log('Error al crear el producto');
                console.log(response);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear el producto',
                    text: 'Verifique los datos ingresados',
                });
            }
        } else {
            console.log(searchProduct);
            console.log('El producto ya existe');
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el producto',
                text: 'El producto ya existe',
            });
        }
    };

    return (
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
                        <Form.Label>Descripción del producto</Form.Label>
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
    );
};
