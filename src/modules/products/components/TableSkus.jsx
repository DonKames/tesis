import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import usePagination from '../../../hooks/usePagination';
import {
    changeActiveStateSku,
    getSkuBySku,
    getSkus,
    getSkusQty,
    updateSku,
} from '../APIs/skusAPI';
import { productsSetSkus, productsSetSkusQty } from '../slice/productsSlice';
import { ModalSku } from './ModalSku';
import useHasAccess from '../../../shared/hooks/useHasAccess';
import { useFormik } from 'formik';
import { skuSchema } from '../../../validations/skuSchema';

export const TableSkus = () => {
    // Dispatch
    const dispatch = useDispatch();

    // Redux States
    const { skus, skusQty } = useSelector((state) => state.products);

    // Local States
    const [showModal, setShowModal] = useState(false);
    const [skuToEdit, setSkuToEdit] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    const hasAccess = useHasAccess([1, 2]);

    // Sku pagination hook
    const {
        handlePageChange: handlePageChangeSku,
        limit: skuLimit,
        pagesQty: pagesQtySku,
        selectedPage: selectedPageSku,
        setLimit: setSkuLimit,
        setPagesQty,
        setShowInactive,
        showInactive,
        setSearchTerm,
        searchTerm,
    } = usePagination(
        getSkus,
        getSkusQty,
        productsSetSkus,
        productsSetSkusQty,
        skusQty,
        10,
    );

    // Sku table columns
    const tableColumnsSkus = [
        { name: 'Sku', className: '' },
        { name: 'Nombre', className: '' },
        { name: 'Descripción', className: '' },
        { name: 'Stock', className: 'text-center' },
        { name: 'Cantidad Mínima', className: 'text-center' },
        { name: '', className: '' },
    ];

    const handleFormSubmit = async (values) => {
        console.log(values);

        console.log(skuToEdit);

        if (skuToEdit.sku !== values.sku) {
            const checkSku = await getSkuBySku(values.sku);

            console.log(checkSku);

            if (checkSku) {
                console.log('entra if');

                formik.setFieldError(
                    'sku',
                    'Ya existe este SKU. Por favor, use un SKU diferente.',
                );
            } else {
                console.log('entra else');
                try {
                    await updateSku(skuToEdit.id, values);
                    // Actualizar el estado de Redux
                    const updatedSkus = skus.map((sku) => {
                        if (sku.id === skuToEdit.id) {
                            return { ...sku, ...formik.values };
                        }
                        return sku;
                    });
                    dispatch(productsSetSkus(updatedSkus));
                    Swal.fire(
                        'Actualizado',
                        'El SKU ha sido actualizado.',
                        'success',
                    );
                    handleModalChange();
                } catch (error) {
                    console.log(error);
                    Swal.fire(
                        'Error',
                        'Ha habido un problema al actualizar el SKU.',
                        'error',
                    );
                }
            }
        } else {
            try {
                await updateSku(skuToEdit.id, values);
                // Actualizar el estado de Redux
                const updatedSkus = skus.map((sku) => {
                    if (sku.id === skuToEdit.id) {
                        return { ...sku, ...formik.values };
                    }
                    return sku;
                });
                dispatch(productsSetSkus(updatedSkus));
                Swal.fire(
                    'Actualizado',
                    'El SKU ha sido actualizado.',
                    'success',
                );
                handleModalChange();
            } catch (error) {
                console.log(error);
                Swal.fire(
                    'Error',
                    'Ha habido un problema al actualizar el SKU.',
                    'error',
                );
            }
        }
    };

    const formik = useFormik({
        initialValues: {
            active: true,
            description: '',
            minimumStock: 0,
            name: '',
            sku: '',
        },
        validationSchema: skuSchema,
        onSubmit: handleFormSubmit,
    });

    // Sku table row renderer
    const skuRenderer = (sku) => (
        <tr
            className={sku.active ? '' : 'table-danger'}
            key={sku.id}

            // style={{ backgroundColor: sku.active ? 'white' : 'red' }}
        >
            <td className="align-middle">{sku.sku}</td>

            <td className="align-middle">{sku.name}</td>
            <td className="align-middle">{sku.description}</td>
            <td className="align-middle text-center">{sku.stock}</td>
            <td className="align-middle text-center">
                {sku.minimumStock || 'Sin Determinar'}
            </td>
            <td className="align-middle text-end">
                <Button
                    className="me-1 shadow"
                    onClick={() => handleOpenForm(sku.id)}
                    disabled={!hasAccess}
                >
                    <i className="bi bi-pencil-square"></i>
                </Button>

                {sku.active ? (
                    <Button
                        className="me-1 text-white shadow"
                        variant="danger"
                        onClick={() => handleDeactivateSku(sku.id)}
                        disabled={!hasAccess}
                    >
                        <i className="bi bi-trash3" />
                    </Button>
                ) : (
                    <Button
                        className="me-1 shadow"
                        onClick={() => handleActivateSku(sku.id)}
                        variant="success"
                        disabled={!hasAccess}
                    >
                        <i className="bi bi-recycle" />
                    </Button>
                )}
            </td>
        </tr>
    );

    // Funciones para manejar las acciones de editar y eliminar
    const handleOpenForm = async (skuId) => {
        // Lógica para editar el SKU con el ID dado
        const elementToEdit = skus.find((sku) => sku.id === skuId);

        if (elementToEdit) {
            setSkuToEdit(elementToEdit);
            formik.setValues({
                active: elementToEdit.active,
                description: elementToEdit.description,
                minimumStock: elementToEdit.minimumStock || 0,
                name: elementToEdit.name,
                price: elementToEdit.price,
                sku: elementToEdit.sku,
            });
        }

        console.log(skuToEdit);
        handleModalChange();
        // setShowWarning(!skuToEdit.active);
    };

    const handleDeactivateSku = async (skuId) => {
        // Lógica para cambiar el SKU con el ID dado

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Desactivarás este SKU y todos los productos asociados a él.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            // Lógica para eliminar el SKU con el ID dado
            console.log('Eliminando SKU con ID:', skuId);
            const { status, data } = await changeActiveStateSku(skuId, false);

            if (status === 'success') {
                Swal.fire('Eliminado', 'El SKU ha sido eliminado.', 'success');

                console.log(data);

                // Actualizar el estado de Redux
                const updatedSkus = skus.map((sku) => {
                    if (sku.id === skuId) {
                        return { ...sku, active: data.active };
                    }
                    return sku;
                });

                dispatch(productsSetSkus(updatedSkus));
            } else {
                Swal.fire(
                    'Error',
                    'Ha habido un problema al eliminar el SKU.',
                    'error',
                );
            }
        }
    };

    const handleActivateSku = async (skuId) => {
        // Lógica para cambiar el SKU con el ID dado

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Activarás este SKU y pero no todos los productos asociados a él.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, activar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            // Lógica para eliminar el SKU con el ID dado
            console.log('Activando SKU con ID:', skuId);
            const { status, data } = await changeActiveStateSku(skuId, true);

            if (status === 'success') {
                Swal.fire('Activado', 'El SKU ha sido activado.', 'success');

                // Actualizar el estado de Redux
                const updatedSkus = skus.map((sku) => {
                    if (sku.id === skuId) {
                        return { ...sku, active: data.active };
                    }
                    return sku;
                });

                dispatch(productsSetSkus(updatedSkus));
            } else {
                Swal.fire(
                    'Error',
                    'Ha habido un problema al activar el SKU.',
                    'error',
                );
            }
        }
    };

    // Función para abrir y cerrar el modal
    const handleModalChange = () => {
        if (showModal) {
            formik.resetForm();
            setShowWarning(false);
        }
        setShowModal(!showModal);
    };

    return (
        <>
            <ModalSku
                formik={formik}
                handleModalChange={handleModalChange}
                showModal={showModal}
                showWarning={showWarning}
            />
            <PaginatedTable
                columns={tableColumnsSkus}
                footerText={`Total de SKUs: ${skusQty} | Páginas totales: ${pagesQtySku}`}
                handleLimitChange={setSkuLimit}
                handlePageChange={handlePageChangeSku}
                itemRenderer={skuRenderer}
                items={skus}
                limit={skuLimit}
                maxPagesToShow={10}
                pagesQty={pagesQtySku}
                selectedPage={selectedPageSku}
                setPagesQty={setPagesQty}
                setShowInactive={setShowInactive}
                showInactive={showInactive}
                title="SKUs"
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
            />
        </>
    );
};
