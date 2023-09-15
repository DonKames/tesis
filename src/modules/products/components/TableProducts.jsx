import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import usePagination from '../../../hooks/usePagination';
import {
    changeActiveStateProduct,
    getProducts,
    getProductsQty,
} from '../APIs/apiProducts';
import {
    productsSetProductQty,
    productsSetProducts,
} from '../slice/productsSlice';
import { Button } from 'react-bootstrap';
import { ModalProduct } from './ModalProduct';
import { useForm } from '../../../hooks/useForm';
import Swal from 'sweetalert2';

export const TableProducts = () => {
    // Dispatch
    const dispatch = useDispatch();

    // Utilizar el hook de validación
    // TODO: Crear este hook
    // const { isFormValid } = useFormSkuValidation(formValues);

    // Redux States
    const { products, productsQty } = useSelector((state) => state.products);

    // Local States
    const [showModal, setShowModal] = useState(false);
    const [productToEdit, setProductToEdit] = useState({});
    const [showWarning, setShowWarning] = useState(false);
    const [originalActiveState, setOriginalActiveState] = useState(true);

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

    // MODAL
    // Product form
    const [formValues, handleInputChange, reset, setFormValues] = useForm({
        active: true,
        branchId: 0,
        epc: '',
        skuId: 0,
        warehouseId: 0,
    });

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
                >
                    <i className="bi bi-pencil-square" />
                </Button>

                {product.active ? (
                    <Button
                        className="me-1 text-white"
                        variant="danger"
                        onClick={() => handleDeactivateProduct(product.id)}
                    >
                        <i className="bi bi-trash3" />
                    </Button>
                ) : (
                    <Button
                        className="me-1"
                        onClick={() => handleActivateSku(product.id)}
                        variant="success"
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
            setFormValues({
                active: getProductToEdit.active,
                branchId: getProductToEdit.branchId,
                warehouseId: getProductToEdit.warehouseId,
                skuId: getProductToEdit.skuId,
                epc: getProductToEdit.epc,
            });
            setOriginalActiveState(getProductToEdit.active);
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

    const handleActivateSku = async () => {
        // Lógica para activar el SKU
        console.log('Activando SKU con ID:', productToEdit.product_id);

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
            console.log('Activando PRODUCTO con ID:', productToEdit.product_id);

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

    const handleInputChangeWithWarning = ({ target }) => {
        handleInputChange({ target }); // Llamada al handleInputChange original

        // Mostrar u ocultar el mensaje de advertencia
        if (target.name === 'active' && originalActiveState) {
            setShowWarning(!target.checked);
        }
    };

    const handleModalChange = () => {
        if (showModal) {
            reset();
            setOriginalActiveState(true);
            setShowWarning(false);
        }
        setShowModal(!showModal);
    };

    const handleUpdate = async () => {
        // Lógica para actualizar el SKU
        console.log('Actualizando SKU con ID:', productToEdit.product_id);
    };

    return (
        <>
            <ModalProduct
                productId={productToEdit.id}
                formValues={formValues}
                handleInputChange={handleInputChange}
                handleInputChangeWithWarning={handleInputChangeWithWarning}
                handleModalChange={handleModalChange}
                handleUpdate={handleUpdate}
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
            />
        </>
    );
};
