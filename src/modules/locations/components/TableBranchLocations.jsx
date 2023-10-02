import React from 'react';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import { useSelector } from 'react-redux';

export const TableBranchLocations = () => {
    // Redux states
    const { branchLocationsQty } = useSelector((state) => state.locations);

    const maxPaginationButtons = 10;

    const tableColumnsBranchLocations = [
        { name: 'Nombre', className: '' },
        { name: 'Sucursal', className: '' },
        { name: 'Dirección', className: '' },
        { name: '', className: 'text-end' },
    ];

    return (
        <>
            <PaginatedTable
                columns={tableColumnsBranchLocations}
                footerText={`Total de Lugares: ${branchLocationsQty} | Páginas Totales: ${pagesQty} `}
                handleLimitChange={setLimit}
                handlePageChange={handlePageChange}
                itemRenderer={itemRenderer}
                items={branchLocations}
                limit={limit}
                pagesQty={pagesQty}
                selectedPage={selectedPage}
                title="Lugares de Sucursal"
            />
        </>
    );
};
