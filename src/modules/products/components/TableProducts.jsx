import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import usePagination from '../../../hooks/usePagination';
import { getProducts, getProductsQty } from '../APIs/apiProducts';
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
    const { products, productsQty, skus } = useSelector(
        (state) => state.products,
    );

    const { branches, warehouses } = useSelector((state) => state.locations);

    // Local States
    const [showModal, setShowModal] = useState(false);
    const [productToEdit, setProductToEdit] = useState({});
    const [showWarning, setShowWarning] = useState(false);
    const [originalActiveState, setOriginalActiveState] = useState(true);

    // Product pagination hook
    const {
        selectedPage: selectedPageProduct,
        pagesQty: pagesQtyProduct,
        handlePageChange: handlePageChangeProduct,
        setLimit: setProductLimit,
        limit: productLimit,
    } = usePagination(
        getProducts,
        getProductsQty,
        productsSetProducts,
        productsSetProductQty,
        productsQty,
        10,
    );

    // Product table columns
    const tableColumnsProducts = ['Sku', 'Sucursal', 'Bodega', 'EPC', ''];

    // MODAL
    // Product form
    const [formValues, handleInputChange, reset, setFormValues] = useForm({
        active: true,
        sku: '',
        warehouse: '',
        epc: '',
    });

    const productRenderer = (product) => (
        <tr key={product.product_id}>
            <td className='align-middle'>
                {skus.find((sku) => sku.sku_id === product.fk_sku_id)?.sku}
            </td>
            <td className='align-middle'>
                {
                    branches.find(
                        (branch) =>
                            branch.branch_id ===
                            warehouses.find(
                                (warehouse) =>
                                    warehouse.warehouse_id ===
                                    product.fk_warehouse_id,
                            )?.fk_branch_id,
                    )?.name
                }
            </td>
            <td className='align-middle'>
                {
                    warehouses.find(
                        (warehouse) =>
                            warehouse.warehouse_id === product.fk_warehouse_id,
                    )?.name
                }
            </td>
            <td className='align-middle'>{product.epc}</td>
            <td className='align-middle text-end'>
                <Button
                    className='me-1'
                    onClick={() => handleOpenForm(product.product_id)}
                >
                    <i className='bi bi-pencil-square' />
                </Button>

                <Button
                    className='me-1 text-white'
                    variant='danger'
                    onClick={() => handleProductDelete(product.product_id)}
                >
                    <i className='bi bi-trash3' />
                </Button>
            </td>
        </tr>
    );

    // Función para el Renderer
    // Funciones para manejar las acciones de editar y eliminar
    const handleOpenForm = async (productId) => {
        // Lógica para editar el SKU con el ID dado
        const getProductToEdit = products.find(
            (product) => product.product_id === productId,
        );

        console.log(getProductToEdit);

        if (getProductToEdit) {
            setProductToEdit(getProductToEdit);
            setFormValues({
                active: getProductToEdit.active,
                warehouse: getProductToEdit.fk_warehouse_id,
                sku: getProductToEdit.fk_sku_id,
                epc: getProductToEdit.epc,
            });

            console.log('producto a editar', getProductToEdit);
            console.log('id?:', productToEdit.product_id);

            setOriginalActiveState(getProductToEdit.active);
        }

        handleModalChange();
        // setShowWarning(!skuToEdit.active);
    };

    const handleProductDelete = async (productId) => {
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
        console.log('Actualizando SKU con ID:', productToEdit.sku_id);
    };

    return (
        <>
            <ModalProduct
                productId={productToEdit.product_id}
                formValues={formValues}
                handleInputChange={handleInputChange}
                handleInputChangeWithWarning={handleInputChangeWithWarning}
                handleModalChange={handleModalChange}
                handleUpdate={handleUpdate}
                showModal={showModal}
                showWarning={false}
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
            />
        </>
    );
};
