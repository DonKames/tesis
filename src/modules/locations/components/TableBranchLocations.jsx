import React, { useState } from 'react';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import { useDispatch, useSelector } from 'react-redux';
import usePagination from '../../../hooks/usePagination';
import {
    changeBranchLocationState,
    getBranchLocations,
    getBranchLocationsQty,
    updateBranchLocation,
} from '../APIs/branchLocationsAPI';
import {
    locationsSetBranchLocations,
    locationsSetBranchLocationsQty,
} from '../slice/locationsSlice';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ModalEditBranchLocation } from './ModalEditBranchLocation';
import { useForm } from '../../../hooks/useForm';

export const TableBranchLocations = () => {
    const dispatch = useDispatch();

    // Local State
    const [showModal, setShowModal] = useState(false);

    // Redux states
    const { branchLocationsQty, branchLocations } = useSelector(
        (state) => state.locations,
    );

    const maxPaginationButtons = 10;

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
        { name: 'Descripción', className: '' },
        { name: '', className: 'text-end' },
    ];

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
                    <Button
                        className="me-1"
                        onClick={() => handleOpenForm(branchLocation.id)}
                    >
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                    {branchLocation.active ? (
                        <Button
                            className="me-1 text-white"
                            variant="danger"
                            onClick={() =>
                                handleDeactivateBranchLocation(
                                    branchLocation.id,
                                )
                            }
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
                        >
                            <i className="bi bi-arrow-repeat" />
                        </Button>
                    )}
                </td>
            </tr>
        );
    };

    const [formValues, handleInputChange, reset, setFormValues] = useForm({
        active: true,
        branchId: 0,
        branchLocationId: 0,
        description: '',
        name: '',
    });

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

    const handleModalChange = () => {
        if (showModal) {
            reset();
        }

        setShowModal(!showModal);
    };

    const handleUpdate = async () => {
        const { id } = formValues;

        // TODO: create validation hook for this
        const isFormValid = true;

        if (isFormValid) {
            try {
                const { status, data } = await updateBranchLocation(
                    id,
                    formValues,
                );

                if (status === 'success') {
                    Swal.fire({
                        title: '¡Lugar de Sucursal Actualizado!',
                        text: data?.message,
                        icon: 'success',
                    });

                    const updatedBranchLocations = branchLocations.map((bL) =>
                        bL.id === id ? { ...bL, ...formValues } : bL,
                    );

                    dispatch(
                        locationsSetBranchLocations(updatedBranchLocations),
                    );

                    handleModalChange();
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
                    text: 'No se pudo actualizar el Lugar de Sucursal - Error al conectar con la API',
                    icon: 'error',
                });
            }
        }
    };

    const handleOpenForm = (id) => {
        const branchLocation = branchLocations.find((bL) => bL.id === id);

        console.log(branchLocation);

        setFormValues(branchLocation);

        handleModalChange();
    };

    return (
        <>
            <ModalEditBranchLocation
                formValues={formValues}
                handleInputChange={handleInputChange}
                handleModalChange={handleModalChange}
                handleUpdate={handleUpdate}
                showModal={showModal}
            />
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
            />
        </>
    );
};
