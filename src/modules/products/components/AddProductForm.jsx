import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useForm } from '../../../hooks/useForm';
import { productsSetProducts, productsSetSkus } from '../slice/productsSlice';
import { getSkus } from '../APIs/skusAPI';
import Swal from 'sweetalert2';
import { createProduct, getProducts } from '../APIs/productsAPI';
import { getBranches } from '../../locations/APIs/branchesAPI';
import { locationsSetBranches } from '../../locations/slice/locationsSlice';
import { useFormik } from 'formik';
import { SelectSkus } from '../../../shared/ui/components/SelectSkus';
import { productSchema } from '../../../validations/productSchema';
import { SelectBranches } from '../../../shared/ui/components/SelectBranches';
import { SelectWarehouses } from '../../../shared/ui/components/SelectWarehouses';

export const AddProductForm = () => {
    const dispatch = useDispatch();

    // Local States
    const [isValidSku, setIsValidSku] = useState(false);

    const [selectedSku, setSelectedSku] = useState(null);

    const handleFormSubmit = async (values) => {
        const response = await createProduct(values);
        console.log(response);
        console.log('submit: ', values);
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

    // const handleAddProduct = async () => {
    //     if (isValidSku) {
    //         const response = await createProduct(formValues);

    //         const { products } = await getProducts();
    //         dispatch(productsSetProducts(products));

    //         if (response) {
    //             console.log('Producto creado');
    //             console.log(response);

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Producto creado con éxito',
    //                 showConfirmButton: false,
    //                 timer: 1500,
    //             });
    //         }
    //     } else {
    //         console.log('El producto no existe');
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Error al crear el producto',
    //             text: 'El sku no existe',
    //         });
    //     }
    // };

    // const branchOptions = branches?.map((branch) => ({
    //     value: branch.branch_id,
    //     label: branch.name,
    // }));

    return (
        <Card className="mb-3">
            <Card.Header>
                <Card.Title>Agregar Producto</Card.Title>
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
                <Card.Footer>
                    <Button type="submit" variant="primary">
                        Guardar Producto
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    );
};
