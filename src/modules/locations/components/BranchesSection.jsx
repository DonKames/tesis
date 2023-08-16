import React from 'react';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import { getBranches, getBranchesQty } from '../APIs/apiBranches';
import {
    locationsSetBranches,
    locationsSetBranchesQty,
} from '../slice/locationsSlice';
import { useSelector } from 'react-redux';
import usePagination from '../../../hooks/usePagination';

export const BranchesSection = () => {
    // Redux states
    const { branches, branchesQty, regions, countries } = useSelector(
        (state) => state.locations,
    );

    // Max pagination buttons to show
    const maxPaginationButtons = 10;

    // Branch pagination hook
    const { selectedPage, pagesQty, handlePageChange, setLimit, limit } =
        usePagination(
            getBranches,
            getBranchesQty,
            locationsSetBranches,
            locationsSetBranchesQty,
            branchesQty,
            maxPaginationButtons,
        );

    // Branches table columns
    const tableColumnsBranches = ['Nombre', 'País', 'Región', 'Dirección'];

    // Branches table item renderer
    const itemRenderer = (branch) => {
        return (
            <tr key={branch.branch_id}>
                <td>{branch.name}</td>
                <td>
                    {
                        countries.find(
                            (country) =>
                                country.country_id ===
                                regions.find(
                                    (region) =>
                                        region.region_id ===
                                        branch.fk_region_id,
                                )?.fk_country_id,
                        )?.name
                    }
                </td>
                <td>
                    {
                        regions.find(
                            (region) =>
                                region.region_id === branch.fk_region_id,
                        )?.name
                    }
                </td>
                <td>{branch.address}</td>
            </tr>
        );
    };

    return (
        <>
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
            />
        </>
    );
};
