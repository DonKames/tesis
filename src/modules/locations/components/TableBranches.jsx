import React from 'react';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import { useSelector } from 'react-redux';
import usePagination from '../../../hooks/usePagination';
import { getBranches, getBranchesQty } from '../APIs/branchesAPI';
import {
    locationsSetBranches,
    locationsSetBranchesQty,
} from '../slice/locationsSlice';
import { Button } from 'react-bootstrap';

export const TableBranches = () => {
    const maxPaginationButtons = 10;

    // Redux states
    const { branches, branchesQty } = useSelector((state) => state.locations);

    const tableColumnsBranches = [
        { name: 'Nombre', className: '' },
        { name: 'País', className: '' },
        { name: 'Región', className: '' },
        { name: 'Dirección', className: '' },
        { name: '', className: 'text-end' },
    ];

    const { selectedPage, pagesQty, handlePageChange, setLimit, limit } =
        usePagination(
            getBranches,
            getBranchesQty,
            locationsSetBranches,
            locationsSetBranchesQty,
            branchesQty,
            maxPaginationButtons,
        );

    // Branches table item renderer
    const itemRenderer = (branch) => {
        return (
            <tr key={branch.branch_id}>
                <td>{branch.name}</td>
                <td>{branch.countryName}</td>
                <td>{branch.regionName}</td>
                <td>{branch.address}</td>
                <td>
                    {branch.active ? (
                        <Button className="me-1 text-white" variant="danger">
                            <i className="bi bi-trash3" />
                        </Button>
                    ) : (
                        <Button>
                            <i className="bi bi-recycle" />
                        </Button>
                    )}
                </td>
            </tr>
        );
    };

    return (
        <PaginatedTable
            items={branches}
            columns={tableColumnsBranches}
            handlePageChange={handlePageChange}
            itemRenderer={itemRenderer}
            pagesQty={pagesQty}
            selectedPage={selectedPage}
            footerText={`Total de Sucursales: ${branchesQty} | Páginas Totales: ${pagesQty} `}
            handleLimitChange={setLimit}
            limit={limit}
            title="Sucursales"
        />
    );
};
