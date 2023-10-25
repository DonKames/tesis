import React from 'react';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeActiveStateWarehouse,
    getWarehouses,
    getWarehousesQty,
} from '../APIs/warehouseAPI';
import {
    locationsSetWarehouses,
    locationsSetWarehousesQty,
} from '../slice/locationsSlice';
import usePagination from '../../../hooks/usePagination';
import { Button } from 'react-bootstrap';
import { ModalEditWarehouse } from './ModalEditWarehouse';
import Swal from 'sweetalert2';

export const TableWarehouses = () => {
    const maxPaginationButtons = 10;

    const dispatch = useDispatch();

    // Redux states
    const { warehouses, warehousesQty } = useSelector(
        (state) => state.locations,
    );

    const tableColumnsWarehouses = [
        { name: 'Nombre', className: '' },
        { name: 'Sucursal', className: '' },
        { name: 'Capacidad', className: '' },
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
    } = usePagination(
        getWarehouses,
        getWarehousesQty,
        locationsSetWarehouses,
        locationsSetWarehousesQty,
        warehousesQty,
        maxPaginationButtons,
    );

    const itemRenderer = (warehouse) => {
        return (
            <tr
                className={warehouse.active ? '' : 'table-danger'}
                key={warehouse.id}
            >
                <td className="align-middle">{warehouse.name}</td>
                <td className="align-middle">{warehouse.branchName}</td>
                <td className="align-middle">
                    {warehouse.capacity === null || warehouse.capacity === 0
                        ? 'Sin Determinar'
                        : warehouse.capacity + ' m3'}
                </td>
                <td className="align-middle text-end">
                    <ModalEditWarehouse warehouseId={warehouse.id} />
                    {warehouse.active ? (
                        <Button
                            className="me-1 text-white"
                            variant="danger"
                            onClick={() =>
                                handleDeactivateWarehouse(warehouse.id)
                            }
                        >
                            <i className="bi bi-trash"></i>
                        </Button>
                    ) : (
                        <Button
                            className="me-1"
                            variant="success"
                            onClick={() =>
                                handleActivateWarehouse(warehouse.id)
                            }
                        >
                            <i className="bi bi-arrow-repeat" />
                        </Button>
                    )}
                </td>
            </tr>
        );
    };

    const handleDeactivateWarehouse = async (WarehouseId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'La bodega será desactivada y no podrá ser utilizada en el sistema.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3084d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, desactivar',
            cancelButtonText: 'No, cancelar',
        });

        if (result.isConfirmed) {
            try {
                const { status, data } = await changeActiveStateWarehouse(
                    WarehouseId,
                    false,
                );

                if (status === 'success') {
                    Swal.fire({
                        title: '¡Bodega desactivada!',
                        text: 'La bodega ha sido desactivada con éxito.',
                        icon: 'success',
                    });

                    const updatedWarehouses = warehouses.map((w) =>
                        w.id === WarehouseId ? { ...w, active: false } : w,
                    );

                    dispatch(locationsSetWarehouses(updatedWarehouses));
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
                    text: 'No se pudo desactivar la Bodega - Error al conectar con la API',
                    icon: 'error',
                });
            }
        }
    };

    const handleActivateWarehouse = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'La bodega será activada y podrá ser utilizada en el sistema.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3084d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, activar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            const { status, data } = await changeActiveStateWarehouse(id, true);

            if (status === 'success') {
                Swal.fire({
                    title: '¡Bodega activada!',
                    text: 'La bodega ha sido activada con éxito.',
                    icon: 'success',
                });

                const updatedWarehouses = warehouses.map((w) =>
                    w.id === id ? { ...w, active: true } : w,
                );

                dispatch(locationsSetWarehouses(updatedWarehouses));
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
                columns={tableColumnsWarehouses}
                footerText={`Total de Bodegas: ${warehousesQty} | Páginas Totales: ${pagesQty} `}
                handleLimitChange={setLimit}
                handlePageChange={handlePageChange}
                itemRenderer={itemRenderer}
                items={warehouses}
                limit={limit}
                maxPagesToShow={maxPaginationButtons}
                pagesQty={pagesQty}
                selectedPage={selectedPage}
                setPagesQty={setPagesQty}
                setShowInactive={setShowInactive}
                showInactive={showInactive}
                title="Bodegas"
            />
        </>
    );
};
