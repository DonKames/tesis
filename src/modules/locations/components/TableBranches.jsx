import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import usePagination from '../../../hooks/usePagination';
import {
    changeActiveStateBranch,
    getBranches,
    getBranchesQty,
} from '../APIs/branchesAPI';
import {
    locationsSetBranches,
    locationsSetBranchesQty,
} from '../slice/locationsSlice';
import { ModalEditBranch } from './ModalEditBranch';
import useHasAccess from '../../../shared/hooks/useHasAccess';

export const TableBranches = () => {
    const dispatch = useDispatch();

    // Redux states
    const { branches, branchesQty } = useSelector((state) => state.locations);

    const hasAccess = useHasAccess([1, 2]);

    const maxPaginationButtons = 10;

    const tableColumnsBranches = [
        { name: 'Nombre', className: '' },
        { name: 'País', className: '' },
        { name: 'Región', className: '' },
        { name: 'Comuna', className: '' },
        { name: 'Dirección', className: '' },
        { name: '', className: 'text-end' },
    ];

    const {
        handlePageChange,
        limit,
        pagesQty,
        selectedPage,
        setLimit,
        setPagesQty,
        setShowInactive,
        showInactive,
        setSearchTerm,
        searchTerm,
    } = usePagination(
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
            <tr className={branch.active ? '' : 'table-danger'} key={branch.id}>
                <td className="align-middle">{branch.name}</td>
                <td className="align-middle">{branch.countryName}</td>
                <td className="align-middle">{branch.regionName}</td>
                <td className="align-middle">{branch.municipalityName}</td>
                <td className="align-middle">{branch.address}</td>
                <td className="align-middle text-end">
                    <ModalEditBranch branchId={branch.id} />
                    {branch.active ? (
                        <Button
                            className="me-1 text-white"
                            variant="danger"
                            onClick={() => handleDeactivateBranch(branch.id)}
                            disabled={!hasAccess}
                        >
                            <i className="bi bi-trash3" />
                        </Button>
                    ) : (
                        <Button
                            className="me-1"
                            variant="success"
                            onClick={() => handleActivateBranch(branch.id)}
                        >
                            <i className="bi bi-recycle" />
                        </Button>
                    )}
                </td>
            </tr>
        );
    };

    const handleDeactivateBranch = async (branchId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres desactivar esta sucursal?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3084d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, desactivar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            console.log('Desactivando Branch con ID:', branchId);

            try {
                const { status, data } = await changeActiveStateBranch(
                    branchId,
                    false,
                );

                if (status === 'success') {
                    Swal.fire({
                        title: '¡Sucursal desactivada!',
                        text: 'La sucursal ha sido desactivada con éxito.',
                        icon: 'success',
                    });

                    const updatedBranches = branches.map((branch) =>
                        branch.id === branchId
                            ? { ...branch, active: false }
                            : branch,
                    );

                    dispatch(locationsSetBranches(updatedBranches));
                } else {
                    Swal.fire({
                        title: '¡Error!',
                        text: data.message,
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: '¡Error!',
                    text: 'No se pudo desactivar la Sucursal - Error al conectar con la API',
                    icon: 'error',
                });
            }
        }
    };

    const handleActivateBranch = async (branchId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres activar esta sucursal?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3084d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, activar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            console.log('Activando PRODUCTO con ID:', branchId);

            const { status, data } = await changeActiveStateBranch(
                branchId,
                true,
            );

            if (status === 'success') {
                Swal.fire({
                    title: '¡Sucursal activada!',
                    text: 'La sucursal ha sido activada con éxito.',
                    icon: 'success',
                });

                const updatedBranches = branches.map((branch) =>
                    branch.id === branchId
                        ? { ...branch, active: true }
                        : branch,
                );

                dispatch(locationsSetBranches(updatedBranches));
            } else {
                Swal.fire({
                    title: '¡Error!',
                    text: data.message,
                    icon: 'error',
                });
            }
        }
    };

    return (
        <>
            <PaginatedTable
                columns={tableColumnsBranches}
                footerText={`Total de Sucursales: ${branchesQty} | Páginas Totales: ${pagesQty} `}
                handleLimitChange={setLimit}
                handlePageChange={handlePageChange}
                itemRenderer={itemRenderer}
                items={branches}
                limit={limit}
                maxPagesToShow={10}
                pagesQty={pagesQty}
                selectedPage={selectedPage}
                setPagesQty={setPagesQty}
                setShowInactive={setShowInactive}
                showInactive={showInactive}
                title="Sucursales"
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
            />
        </>
    );
};
