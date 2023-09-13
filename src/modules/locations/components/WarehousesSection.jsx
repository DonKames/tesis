import React from 'react';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import { useSelector } from 'react-redux';
import usePagination from '../../../hooks/usePagination';
import { getWarehouses, getWarehousesQty } from '../APIs/warehouseAPI';
import {
    locationsSetWarehouses,
    locationsSetWarehousesQty,
} from '../slice/locationsSlice';

export const WarehousesSection = () => {
    // Redux states
    const { warehouses, warehousesQty, branches } = useSelector(
        (state) => state.locations,
    );

    // Max pagination buttons to show
    const maxPaginationButtons = 10;

    // Pagination hook
    const { selectedPage, pagesQty, handlePageChange, setLimit, limit } =
        usePagination(
            getWarehouses,
            getWarehousesQty,
            locationsSetWarehouses,
            locationsSetWarehousesQty,
            warehousesQty,
            maxPaginationButtons,
        );

    // Table columns
    const columns = ['Nombre', 'Sucursal', 'Capacidad'];

    // Item Renderer
    const itemRenderer = (warehouse) => {
        return (
            <tr key={warehouse.warehouse_id}>
                <td>{warehouse.name}</td>
                <td>
                    {
                        branches.find(
                            (branch) =>
                                branch.branch_id === warehouse.fk_branch_id,
                        )?.name
                    }
                </td>
                <td>{warehouse.capacity} m3</td>
            </tr>
        );
    };

    return (
        <>
            <PaginatedTable
                items={warehouses}
                columns={columns}
                handlePageChange={handlePageChange}
                itemRenderer={itemRenderer}
                pagesQty={pagesQty}
                selectedPage={selectedPage}
                footerText={`Total de Bodegas: ${warehousesQty} | Páginas Totales: ${pagesQty} `}
                handleLimitChange={setLimit}
                limit={limit}
            />
        </>
    );
};
