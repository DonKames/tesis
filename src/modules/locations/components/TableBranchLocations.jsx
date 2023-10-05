import React from 'react';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import { useDispatch, useSelector } from 'react-redux';
import usePagination from '../../../hooks/usePagination';
import {
    changeBranchLocationState,
    getBranchLocations,
    getBranchLocationsQty,
} from '../APIs/branchLocationsAPI';
import {
    locationsSetBranchLocations,
    locationsSetBranchLocationsQty,
} from '../slice/locationsSlice';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const TableBranchLocations = () => {
    const dispatch = useDispatch();

    // Redux states
    const { branchLocationsQty, branchLocations } = useSelector(
        (state) => state.locations,
    );

    const maxPaginationButtons = 10;

    const { selectedPage, pagesQty, handlePageChange, setLimit, limit } =
        usePagination(
            getBranchLocations,
            getBranchLocationsQty,
            locationsSetBranchLocations,
            locationsSetBranchLocationsQty,
            branchLocationsQty,
            maxPaginationButtons,
        );

    const tableColumnsBranchLocations = [
        { name: 'Nombre', className: '' },
        { name: 'Sucursal', className: '' },
        { name: 'Dirección', className: '' },
        { name: '', className: 'text-end' },
    ];

    const itemRenderer = (branchLocation) => {
        return (
            <tr
                key={branchLocation.branch_location_id}
                className={branchLocation.active ? '' : 'table-danger'}
            >
                <td className="align-middle">{branchLocation.name}</td>
                <td className="align-middle">{branchLocation.branch_name}</td>
                <td className="align-middle">{branchLocation.description}</td>
                <td className="align-middle text-end">
                    <Button className="me-1" onClick={() => {}}>
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                    {branchLocation.active ? (
                        <Button
                            className="me-1 text-white"
                            variant="danger"
                            onClick={() =>
                                handleDeactivateBranchLocation(
                                    branchLocation.branch_location_id,
                                )
                            }
                        >
                            <i className="bi bi-trash" />
                        </Button>
                    ) : (
                        <Button
                            className="me-1"
                            variant="success"
                            onClick={() => {}}
                        >
                            <i className="bi bi-arrow-repeat" />
                        </Button>
                    )}
                </td>
            </tr>
        );
    };

    const handleDeactivateBranchLocation = async (id) => {
        const result = await Swal.fire({
            title: '¿Está seguro?',
            text: 'Esta acción no se puede revertir',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3084d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, desactivar',
            cancelButtonText: 'No, cancelar',
        });

        if (result.isConfirmed) {
            try {
                const { status, data } = await changeBranchLocationState(
                    id,
                    false,
                );

                if (status === 'success') {
                    Swal.fire({
                        title: '¡Lugar de Sucursal Desactivado!',
                        text: data?.message,
                        icon: 'success',
                    });

                    const updatedBranchLocations = branchLocations.map((bL) =>
                        bL.id === id ? { ...bL, active: false } : bL,
                    );

                    dispatch(
                        locationsSetBranchLocations(updatedBranchLocations),
                    );
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
                    text: 'No se pudo desactivar el Lugar de Sucursal - Error al conectar con la API',
                    icon: 'error',
                });
            }
        }
    };

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
