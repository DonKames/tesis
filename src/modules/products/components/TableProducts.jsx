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

export const TableProducts = () => {
    // Dispatch
    const dispatch = useDispatch();

    // Redux States
    const { products, productsQty, skus } = useSelector(
        (state) => state.products,
    );

    const { branches, warehouses } = useSelector((state) => state.locations);

    // Local States
    const [showModal, setShowModal] = useState(false);

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
                <Button className='me-1'>
                    <i className='bi bi-pencil-square' />
                </Button>

                <Button
                    className='me-1 text-white'
                    variant='danger'
                >
                    <i className='bi bi-trash3' />
                </Button>
            </td>
        </tr>
    );

    return (
        <>
            <ModalProduct />
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
