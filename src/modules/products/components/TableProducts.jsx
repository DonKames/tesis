import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import usePagination from '../../../hooks/usePagination';
import { getProducts, getProductsQty } from '../APIs/apiProducts';
import {
    productsSetProductQty,
    productsSetProducts,
} from '../slice/productsSlice';

export const TableProducts = () => {
    // Dispatch
    const dispatch = useDispatch();

    // Redux States
    const { products, productsQty, branches, warehouses, skus } = useSelector(
        (state) => state.products,
    );

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
        </tr>
    );

    return (
        <>
            <PaginatedTable
                columns={tableColumnsProducts}
                footerText={`Mostrando ${products.length} de ${productsQty} productos`}
                handlePageChange={handlePageChangeProduct}
                itemRenderer={productRenderer}
                items={products}
                itemsQty={productsQty}
                limit={productLimit}
                pagesQty={pagesQtyProduct}
                selectedPage={selectedPageProduct}
                setLimit={setProductLimit}
            />
        </>
    );
};
