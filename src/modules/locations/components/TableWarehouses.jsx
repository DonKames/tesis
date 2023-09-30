import React from 'react';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import { useDispatch, useSelector } from 'react-redux';
import { getWarehouses, getWarehousesQty } from '../APIs/warehouseAPI';
import {
    locationsSetWarehouses,
    locationsSetWarehousesQty,
} from '../slice/locationsSlice';
import usePagination from '../../../hooks/usePagination';
import { Button } from 'react-bootstrap';
import { ModalEditWarehouse } from './ModalEditWarehouse';
import { useForm } from '../../../hooks/useForm';

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
                <td className="align-middle">{warehouse.capacity} m3</td>
                <td className="align-middle text-end">
                    <Button
                        className="me-1"
                        // onClick={() => handleEdit(warehouse)}
                    >
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                    {warehouse.active ? (
                        <Button
                            className="me-1 text-white"
                            variant="danger"
                            // onClick={() => handleDelete(warehouse.id)}
                        >
                            <i className="bi bi-trash"></i>
                        </Button>
                    ) : (
                        <Button
                            className="me-1"
                            variant="success"
                            // onClick={() => handleRestore(warehouse.id)}
                        >
                            <i className="bi bi-arrow-repeat"></i>
                        </Button>
                    )}
                </td>
            </tr>
        );
    };

    const [formValues, handleInputChange, reset, setFormValues] = useForm({
        name: '',
        branch: '',
        capacity: '',
        active: true,
    });

    const handleModalChange = () => {
        if (showModal) {
            reset();
        }

        setShowModal(!showModal);
    };

    return (
        <>
            <ModalEditWarehouse
                formValues={formValues}
                handleInputChange={handleInputChange}
                handleModalChange={() => {}}
            />
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
