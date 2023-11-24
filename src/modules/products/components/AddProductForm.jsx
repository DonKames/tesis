import React from 'react';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import {
    createProduct,
    getProductByEPC,
    getProductsQty,
} from '../APIs/productsAPI';
import { useFormik } from 'formik';
import { SelectSkus } from '../../../shared/ui/components/SelectSkus';
import { productSchema } from '../../../validations/productSchema';
import { SelectBranches } from '../../../shared/ui/components/SelectBranches';
import { SelectWarehouses } from '../../../shared/ui/components/SelectWarehouses';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { productsSetProductQty } from '../slice/productsSlice';

export const AddProductForm = () => {
    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.auth);

    const handleFormSubmit = async (values) => {
        console.log(values);
        const { data: epcCheck } = await getProductByEPC(values.epc);

        // console.log(epcCheck);

        if (epcCheck === null) {
            // console.log('userId:', userId);
            const { data } = await createProduct(values, userId);
            console.log('product data: ', data);
            if (data) {
                const { data } = getProductsQty({});
                console.log(data);
                dispatch(productsSetProductQty(data));

                Swal.fire({
                    icon: 'success',
                    title: 'Producto creado con éxito',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ocurrió un error al crear el producto',
                    text: 'Por favor intenta de nuevo más tarde',
                });
            }
        } else {
            formik.setFieldError(
                'epc',
                'Ya existe un producto con este EPC. Por favor, use un EPC diferente.',
            );
        }
    };

    const formik = useFormik({
        initialValues: {
            skuId: 0,
            branchId: 0,
            warehouseId: 0,
            epc: '',
        },
        validationSchema: productSchema,
        onSubmit: handleFormSubmit,
    });

    return (
        <Card className="mb-3">
            <Card.Header>
                <Card.Title className="fs-3 mb-0">Agregar Producto</Card.Title>
            </Card.Header>
            <Form onSubmit={formik.handleSubmit}>
                <Card.Body>
                    <Form.Group>
                        <SelectSkus
                            errorMessage={formik.errors.skuId}
                            name="skuId"
                            isInvalid={
                                formik.touched.skuId && !!formik.errors.skuId
                            }
                            setFieldTouched={formik?.setFieldTouched}
                            setFieldValue={formik?.setFieldValue}
                            skuId={formik.values?.skuId}
                        />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <SelectBranches
                            errorMessage={formik.errors.branchId}
                            name="branchId"
                            isInvalid={
                                formik.touched.branchId &&
                                !!formik.errors.branchId
                            }
                            setFieldTouched={formik.setFieldTouched}
                            setFieldValue={formik.setFieldValue}
                            branchId={formik.values.branchId}
                        />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <SelectWarehouses
                            branchId={formik.values.branchId}
                            errorMessage={formik.errors.warehouseId}
                            isInvalid={
                                formik.touched.warehouseId &&
                                !!formik.errors.warehouseId
                            }
                            name="warehouseId"
                            setFieldTouched={formik.setFieldTouched}
                            setFieldValue={formik.setFieldValue}
                            warehouseId={formik.values.warehouseId}
                        />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <FloatingLabel label="Tag / EPC">
                            <Form.Control
                                className={
                                    formik.touched.epc && formik.errors.epc
                                        ? 'is-invalid'
                                        : ''
                                }
                                type="text"
                                placeholder="Ingrese el epc para el producto"
                                name="epc"
                                value={formik.values.epc}
                                onChange={formik.handleChange}
                                isInvalid={
                                    formik.touched.epc && formik.errors.epc
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.epc}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Card.Body>
                <Card.Footer className="text-end">
                    <Button type="submit" variant="primary">
                        Guardar Producto
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    );
};
