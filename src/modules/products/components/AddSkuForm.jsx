import React from 'react';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { createSku, getSkuBySku, getSkusNames } from '../APIs/skusAPI';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { skuSchema } from '../../../validations/skuSchema';
import { uiSetSkusNames } from '../../../shared/ui/slice/uiSlice';

export const AddSkuForm = () => {
    const dispatch = useDispatch();

    // const { name, description, price, sku, lote, order } = formSkuValues;

    const handleFormSubmit = async (values) => {
        console.log('click skuForm: ', values);
        // const { name, description, minimumAmount, sku, lote, order } = values;

        const checkSku = await getSkuBySku(values.sku);

        console.log(checkSku);

        if (checkSku) {
            formik.setFieldError(
                'sku',
                'Ya existe este SKU. Por favor, usa un SKU diferente.',
            );
        } else {
            try {
                const response = await createSku(values);

                if (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'SKU creado con éxito',
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    const updatedSkus = await getSkusNames();
                    dispatch(uiSetSkusNames(updatedSkus));
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ocurrió un error al crear el SKU',
                        text: 'Por favor intenta de nuevo más tarde',
                    });

                    throw new Error('Error al guardar el producto');
                }
            } catch (error) {
                console.log('Error al crear el SKU');
            }
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            minimumStock: 0,
            sku: '',
            lote: '',
            order: '',
        },
        validationSchema: skuSchema,
        onSubmit: handleFormSubmit,
    });

    const { name, description, minimumStock, sku } = formik.values;

    return (
        <Card className="mb-3">
            <Card.Header>
                <Card.Title className="fs-3 mb-0">Agregar SKU</Card.Title>
            </Card.Header>
            <Form onSubmit={formik.handleSubmit}>
                <Card.Body>
                    <Form.Group className="mb-2">
                        <FloatingLabel label="SKU">
                            <Form.Control
                                className={
                                    formik.touched.sku && formik.errors.sku
                                        ? 'is-invalid'
                                        : ''
                                }
                                type="text"
                                placeholder="Ingrese el SKU para el producto"
                                name="sku"
                                value={sku}
                                onChange={formik.handleChange}
                                isInvalid={
                                    formik.touched.sku && formik.errors.sku
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.sku}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <FloatingLabel label="Nombre">
                            <Form.Control
                                className={
                                    formik.touched.name && formik.errors.name
                                        ? 'is-invalid'
                                        : ''
                                }
                                type="text"
                                placeholder="Ingrese el nombre del producto"
                                name="name"
                                value={name}
                                onChange={formik.handleChange}
                                isInvalid={
                                    formik.touched.name && formik.errors.name
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.name}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <FloatingLabel label="Descripción">
                            <Form.Control
                                className={
                                    formik.touched.description &&
                                    formik.errors.description
                                        ? 'is-invalid'
                                        : ''
                                }
                                type="text"
                                placeholder="Ingrese la descripción del producto"
                                name="description"
                                value={description}
                                onChange={formik.handleChange}
                                isInvalid={
                                    formik.touched.description &&
                                    formik.errors.description
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.description}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="">
                        <FloatingLabel label="Cantidad Minima">
                            <Form.Control
                                className={
                                    formik.touched.minimumStock &&
                                    formik.errors.minimumStock
                                        ? 'is-invalid'
                                        : ''
                                }
                                isInvalid={
                                    formik.touched.minimumStock &&
                                    formik.errors.minimumStock
                                }
                                min={0}
                                name="minimumStock"
                                onChange={formik.handleChange}
                                placeholder="Ingrese el precio del producto"
                                step={1}
                                type="number"
                                value={minimumStock}
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                className="ms-2"
                            >
                                {formik.errors.minimumStock}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Card.Body>
                <Card.Footer className="text-end">
                    <Button className="btn btn-primary" type="submit">
                        Guardar SKU
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    );
};
