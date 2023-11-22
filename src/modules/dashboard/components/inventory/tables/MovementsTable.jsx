import React from 'react';
import { useSelector } from 'react-redux';
import usePagination from '../../../../../hooks/usePagination';
import {
    getMovements,
    getMovementsQty,
} from '../../../../movements/APIs/movementAPI';
import {
    movementsSetMovements,
    movementsSetMovementsQty,
} from '../../../../movements/movementSlice';
import { PaginatedTable } from '../../../../../shared/ui/components/PaginatedTable';

export const MovementsTable = () => {
    // Redux States
    const { movementsQty, movements } = useSelector((state) => state.movements);

    const {
        handlePageChange,
        limit,
        pagesQty,
        selectedPage,
        setLimit,
        setPagesQty,
        setShowInactive,
        showInactive,
    } = usePagination(
        getMovements,
        getMovementsQty,
        movementsSetMovements,
        movementsSetMovementsQty,
        movementsQty,
        10,
    );

    const tableColumns = [
        { name: 'ID', className: '' },
        { name: 'Producto', className: '' },
        { name: 'Usuario', className: '' },
        { name: 'Fecha y Hora', className: '' },
        { name: 'Bodega', className: '' },
        { name: 'Tipo de Movimiento', className: '' },
    ];

    const itemRenderer = (movement) => {
        return (
            <tr key={movement.id}>
                <td>{movement.id}</td>
                <td>{movement.productId}</td>
                <td>{movement.userId}</td>
                <td>{movement.timestamp}</td>
                <td>{movement.warehouseId}</td>
                <td>{movement.movementTypeId}</td>
            </tr>
        );
    };
    return (
        <>
            <PaginatedTable
                columns={tableColumns}
                footerText={`Total de Movimientos: ${movementsQty} | Páginas Totales: ${pagesQty} `}
                handleLimitChange={setLimit}
                handlePageChange={handlePageChange}
                itemRenderer={itemRenderer}
                items={movements}
                limit={limit}
                maxPagesToShow={10}
                pagesQty={pagesQty}
                selectedPage={selectedPage}
                setPagesQty={setPagesQty}
                setShowInactive={setShowInactive}
                showInactive={showInactive}
                title="Movimientos"
            />
        </>
    );
};
