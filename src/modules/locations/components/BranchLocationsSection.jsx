import React from 'react';
import { useSelector } from 'react-redux';
import usePagination from '../../../hooks/usePagination';
import {
    getBranchLocations,
    getBranchLocationsQty,
} from '../APIs/apiBranchLocation';
import {
    locationsSetBranchLocations,
    locationsSetBranchLocationsQty,
} from '../slice/locationsSlice';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import { Row } from 'react-bootstrap';
import { TableBranchLocations } from './TableBranchLocations';

export const BranchLocationsSection = () => {
    // Redux states
    const { branchLocations, branchLocationsQty, branches } = useSelector(
        (state) => state.locations,
    );

    // Mac pagination buttons to show
    const maxPaginationButtons = 10;

    // Pagination hook
    const { selectedPage, pagesQty, handlePageChange, setLimit, limit } =
        usePagination(
            getBranchLocations,
            getBranchLocationsQty,
            locationsSetBranchLocations,
            locationsSetBranchLocationsQty,
            branchLocationsQty,
            maxPaginationButtons,
        );

    // Columns to show in the table
    // const columns = ['Nombre', 'Sucursal', 'Direccion'];
    const columns = [
        { name: 'Nombre', className: '' },
        { name: 'Sucursal', className: '' },
        { name: 'Dirección', className: '' },
        { name: '', className: 'text-end' },
    ];

    // Item Renderer
    const itemRenderer = (branchLocation) => {
        return (
            <tr key={branchLocation.branch_location_id}>
                <td>{branchLocation.name}</td>
                <td>
                    {
                        branches.find(
                            (branch) =>
                                branch.branch_id ===
                                branchLocation.fk_branch_id,
                        )?.name
                    }
                </td>
                <td>{branchLocation.description}</td>
            </tr>
        );
    };

    return (
        <>
            <Row></Row>
            {/* <TableBranchLocations /> */}
            <PaginatedTable
                columns={columns}
                footerText={`Total de Sucursales: ${branchLocationsQty} | Páginas Totales: ${pagesQty} `}
                handleLimitChange={setLimit}
                handlePageChange={handlePageChange}
                itemRenderer={itemRenderer}
                items={branchLocations}
                limit={limit}
                pagesQty={pagesQty}
                selectedPage={selectedPage}
                title="Lugares de Sucursales"
            />
        </>
    );
};
