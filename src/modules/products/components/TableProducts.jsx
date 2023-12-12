import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import usePagination from '../../../hooks/usePagination';
import {
    changeActiveStateProduct,
    getProductByEPC,
    getProducts,
    getProductsQty,
    updateProduct,
} from '../APIs/productsAPI';
import {
    productsSetProductQty,
    productsSetProducts,
} from '../slice/productsSlice';
import { Button } from 'react-bootstrap';
import { ModalProduct } from './ModalProduct';
import Swal from 'sweetalert2';
import useHasAccess from '../../../shared/hooks/useHasAccess';
import { useFormik } from 'formik';
import { productSchema } from '../../../validations/productSchema';

export const TableProducts = () => {
    // Dispatch
    const dispatch = useDispatch();

    // Redux States
    const { products, productsQty } = useSelector((state) => state.products);
    const { warehousesNames, branchesNames } = useSelector((state) => state.ui);
    const { userId } = useSelector((state) => state.auth);

    // Local States
    const [showModal, setShowModal] = useState(false);
    const [productToEdit, setProductToEdit] = useState({});
    const [showWarning, setShowWarning] = useState(false);

    const hasAccess = useHasAccess([1, 2]);

    // Product pagination hook
    const {
        handlePageChange: handlePageChangeProduct,
        limit: productLimit,
        pagesQty: pagesQtyProduct,
        selectedPage: selectedPageProduct,
        setLimit: setProductLimit,
        setPagesQty,
        setShowInactive,
        showInactive,
        setSearchTerm,
        searchTerm,
    } = usePagination(
        getProducts,
        getProductsQty,
        productsSetProducts,
        productsSetProductQty,
        productsQty,
        10,
    );

    // Product table columns
    const tableColumnsProducts = [
        {
            name: 'Sku',
            className: '',
        },
        {
            name: 'Sucursal',
            className: '',
        },
        {
            name: 'Bodega',
            className: '',
        },
        {
            name: 'EPC',
            className: '',
        },
        {
            name: '',
            className: 'text-end',
        },
    ];

    const handleFormSubmit = async (values) => {
        const { epc } = values;
        if (productToEdit.epc !== epc) {
            const { data } = await getProductByEPC(epc);

            console.log(data);

            if (data) {
                console.log('entra if');

                formik.setFieldError(
                    'epc',
                    'Ya existe este EPC. Por favor, use un EPC diferente.',
                );
            } else {
                try {
                    const { id } = productToEdit;
                    const updatedProduct = await updateProduct(
                        id,
                        values,
                        userId,
                    );

                    console.log(updatedProduct);

                    /* eslint-disable indent */
                    const updatedProducts = products.map((product) =>
                        product.id === id
                            ? {
                                  ...product,
                                  ...formik.values,
                                  warehouseName: warehousesNames.find(
                                      (warehouse) =>
                                          warehouse.id === values.warehouseId,
                                  ).name,
                                  branchName: branchesNames.find(
                                      (branch) => branch.id === values.branchId,
                                  ).name,
                                  // TODO update sku
                                  sku: updatedProduct.sku,
                              }
                            : product,
                    );
                    /* eslint-enable indent */

                    dispatch(productsSetProducts(updatedProducts));

                    Swal.fire({
                        title: '¡Producto actualizado!',
                        text: 'El producto ha sido actualizado.',
                        icon: 'success',
                    });

                    handleModalChange();
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Error',
                        text: error.message,
                        icon: 'error',
                    });
                }
            }
        } else {
            try {
                const { id } = productToEdit;
                const updatedProduct = await updateProduct(id, values, userId);

                console.log(updatedProduct);

                /* eslint-disable indent */
                const updatedProducts = products.map((product) =>
                    product.id === id
                        ? {
                              ...product,
                              ...formik.values,
                              warehouseName: warehousesNames.find(
                                  (warehouse) =>
                                      warehouse.id === values.warehouseId,
                              ).name,
                              branchName: branchesNames.find(
                                  (branch) => branch.id === values.branchId,
                              ).name,
                              sku: updatedProduct.sku,
                          }
                        : product,
                );
                /* eslint-enable indent */

                dispatch(productsSetProducts(updatedProducts));

                Swal.fire({
                    title: '¡Producto actualizado!',
                    text: 'El producto ha sido actualizado.',
                    icon: 'success',
                });

                handleModalChange();
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                });
            }
        }
    };

    const formik = useFormik({
        initialValues: {
            active: true,
            branchId: 0,
            epc: '',
            skuId: 0,
            warehouseId: 0,
        },
        validationSchema: productSchema,
        onSubmit: handleFormSubmit,
    });

    // const { active, branchId, epc, skuId, warehouseId } = formik.values;

    const productRenderer = (product) => (
        <tr className={product.active ? '' : 'table-danger'} key={product.id}>
            <td className="align-middle">{product.sku}</td>
            <td className="align-middle">{product.branchName}</td>
            <td className="align-middle">{product.warehouseName}</td>
            <td className="align-middle">{product.epc}</td>
            <td className="align-middle text-end">
                <Button
                    className="me-1"
                    onClick={() => handleOpenForm(product.id)}
                    disabled={!hasAccess}
                >
                    <i className="bi bi-pencil-square" />
                </Button>

                {product.active ? (
                    <Button
                        className="me-1 text-white"
                        variant="danger"
                        disabled={!hasAccess}
                        onClick={() => handleDeactivateProduct(product.id)}
                    >
                        <i className="bi bi-trash3" />
                    </Button>
                ) : (
                    <Button
                        className="me-1"
                        onClick={() => handleActivateProduct(product.id)}
                        variant="success"
                        disabled={!hasAccess}
                    >
                        <i className="bi bi-recycle" />
                    </Button>
                )}
            </td>
        </tr>
    );

    const handleOpenForm = async (productId) => {
        const getProductToEdit = await products.find(
            (product) => product.id === productId,
        );

        console.log('Producto encontrado:', getProductToEdit);

        if (getProductToEdit) {
            setProductToEdit(getProductToEdit);
            formik.setValues({
                active: getProductToEdit.active,
                branchId: getProductToEdit.branchId,
                warehouseId: getProductToEdit.warehouseId,
                skuId: getProductToEdit.skuId,
                epc: getProductToEdit.epc,
            });
            console.log('Estado original activo:', getProductToEdit.active);
        } else {
            console.log('No se encontró el producto con el ID:', productId);
        }

        handleModalChange();
    };

    const handleDeactivateProduct = async (productId) => {
        // Lógica para eliminar el SKU con el ID dado
        console.log(productId);

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Desactivarás este Producto.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            console.log('Eliminando PRODUCTO con ID:', productId);

            const { status, data } = await changeActiveStateProduct(
                productId,
                false,
            );

            if (status === 'success') {
                Swal.fire({
                    title: '¡Producto desactivado!',
                    text: 'El producto ha sido desactivado.',
                    icon: 'success',
                });

                const updatedProducts = products.map((product) =>
                    product.product_id === productId
                        ? { ...product, active: false }
                        : product,
                );

                dispatch(productsSetProducts(updatedProducts));
            } else {
                Swal.fire({
                    title: 'Error',
                    text: data.message,
                    icon: 'error',
                });
            }
        }
    };

    const handleActivateProduct = async () => {
        // Lógica para activar el SKU
        console.log('Activando SKU con ID:', productToEdit.id);

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Activarás este Producto.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, activar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            console.log('Activando PRODUCTO con ID:', productToEdit.id);

            const { status, data } = await changeActiveStateProduct(
                productToEdit.product_id,
                true,
            );

            if (status === 'success') {
                Swal.fire({
                    title: '¡Producto activado!',
                    text: 'El producto ha sido activado.',
                    icon: 'success',
                });

                const updatedProducts = products.map((product) =>
                    product.product_id === productToEdit.product_id
                        ? { ...product, active: true }
                        : product,
                );

                dispatch(productsSetProducts(updatedProducts));
            } else {
                Swal.fire({
                    title: 'Error',
                    text: data.message,
                    icon: 'error',
                });
            }
        }
    };

    const handleModalChange = () => {
        if (showModal) {
            formik.resetForm();
            // reset();
            setShowWarning(false);
        }
        setShowModal(!showModal);
    };

    return (
        <>
            <ModalProduct
                formik={formik}
                handleModalChange={handleModalChange}
                showModal={showModal}
                showWarning={showWarning}
            />
            <PaginatedTable
                columns={tableColumnsProducts}
                footerText={`Total de Productos: ${productsQty} | Páginas totales: ${pagesQtyProduct}`}
                handleLimitChange={setProductLimit}
                handlePageChange={handlePageChangeProduct}
                itemRenderer={productRenderer}
                items={products}
                limit={productLimit}
                maxPagesToShow={10}
                pagesQty={pagesQtyProduct}
                selectedPage={selectedPageProduct}
                setPagesQty={setPagesQty}
                setShowInactive={setShowInactive}
                showInactive={showInactive}
                title="Productos"
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
            />
        </>
    );
};
