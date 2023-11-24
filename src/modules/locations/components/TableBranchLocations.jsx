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
import { ModalEditBranchLocation } from './ModalEditBranchLocation';
import useHasAccess from '../../../shared/hooks/useHasAccess';

export const TableBranchLocations = () => {
    const maxPaginationButtons = 10;

    const dispatch = useDispatch();

    // Redux states
    const { branchLocationsQty, branchLocations } = useSelector(
        (state) => state.locations,
    );

    const hasAccess = useHasAccess([1, 2]);

    const tableColumnsBranchLocations = [
        { name: 'Nombre', className: '' },
        { name: 'Sucursal', className: '' },
        { name: 'Descripción', className: '' },
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
        getBranchLocations,
        getBranchLocationsQty,
        locationsSetBranchLocations,
        locationsSetBranchLocationsQty,
        branchLocationsQty,
        maxPaginationButtons,
    );

    const itemRenderer = (branchLocation) => {
        return (
            <tr
                key={branchLocation.id}
                className={branchLocation.active ? '' : 'table-danger'}
            >
                <td className="align-middle">{branchLocation.name}</td>
                <td className="align-middle">{branchLocation.branchName}</td>
                <td className="align-middle">{branchLocation.description}</td>
                <td className="align-middle text-end">
                    <ModalEditBranchLocation
                        branchLocationId={branchLocation?.id}
                    />
                    {branchLocation.active ? (
                        <Button
                            className="me-1 text-white"
                            variant="danger"
                            onClick={() =>
                                handleDeactivateBranchLocation(
                                    branchLocation.id,
                                )
                            }
                            disabled={!hasAccess}
                        >
                            <i className="bi bi-trash" />
                        </Button>
                    ) : (
                        <Button
                            className="me-1"
                            variant="success"
                            onClick={() =>
                                handleActivateBranchLocation(branchLocation.id)
                            }
                            disabled={!hasAccess}
                        >
                            <i className="bi bi-arrow-repeat" />
                        </Button>
                    )}
                </td>
            </tr>
        );
    };

    // const [formValues, handleInputChange, reset, setFormValues] = useForm({
    //     active: true,
    //     branchId: 0,
    //     branchLocationId: 0,
    //     description: '',
    //     name: '',
    // });

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

    const handleActivateBranchLocation = async (id) => {
        const result = await Swal.fire({
            title: '¿Está seguro?',
            text: 'Esta acción no se puede revertir',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3084d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, activar',
            cancelButtonText: 'No, cancelar',
        });

        if (result.isConfirmed) {
            try {
                const { status, data } = await changeBranchLocationState(
                    id,
                    true,
                );

                if (status === 'success') {
                    Swal.fire({
                        title: '¡Lugar de Sucursal Activado!',
                        text: data?.message,
                        icon: 'success',
                    });

                    const updatedBranchLocations = branchLocations.map((bL) =>
                        bL.id === id ? { ...bL, active: true } : bL,
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
                    text: 'No se pudo activar el Lugar de Sucursal - Error al conectar con la API',
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
                maxPagesToShow={maxPaginationButtons}
                pagesQty={pagesQty}
                selectedPage={selectedPage}
                setPagesQty={setPagesQty}
                setShowInactive={setShowInactive}
                showInactive={showInactive}
                title="Lugares de Sucursal"
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
            />
        </>
    );
};
