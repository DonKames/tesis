import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import usePagination from '../../../hooks/usePagination';
import {
    changeActiveStateSku,
    getSkus,
    getSkusQty,
    updateSku,
} from '../APIs/skusAPI';
import { productsSetSkus, productsSetSkusQty } from '../slice/productsSlice';
import { useForm } from '../../../hooks/useForm';
import { ModalSku } from './ModalSku';
import { useFormSkuValidation } from '../hooks/useFormSkuValidation';

export const TableSkus = () => {
    // Dispatch
    const dispatch = useDispatch();

    // Redux States
    const { skus, skusQty } = useSelector((state) => state.products);

    // Local States
    const [showModal, setShowModal] = useState(false);
    const [skuToEdit, setSkuToEdit] = useState({});
    const [showWarning, setShowWarning] = useState(false);
    const [originalActiveState, setOriginalActiveState] = useState(true);

    // Sku pagination hook
    const {
        selectedPage: selectedPageSku,
        pagesQty: pagesQtySku,
        handlePageChange: handlePageChangeSku,
        setLimit: setSkuLimit,
        limit: skuLimit,
        showInactive,
        setShowInactive,
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
        'Sku',
        'Nombre',
        'Descripción',
        'Precio',
        'Stock',
        '',
    ];

    // Sku form
    const [formValues, handleInputChange, reset, setFormValues] = useForm({
        active: true,
        description: '',
        minimumStock: '',
        name: '',
        price: '',
        sku: '',
    });

    // Utilizar el hook de validación
    const { isFormValid } = useFormSkuValidation(formValues);

    // Sku table row renderer
    const skuRenderer = (sku) => (
        <tr
            className={sku.active ? '' : 'table-danger'}
            key={sku.sku_id}

            // style={{ backgroundColor: sku.active ? 'white' : 'red' }}
        >
            <td className='align-middle'>{sku.sku}</td>

            <td className='align-middle'>{sku.name}</td>
            <td className='align-middle'>{sku.description}</td>
            <td className='align-middle'>
                $
                {sku.price.toLocaleString('es-CL', {
                    maximumFractionDigits: 0,
                })}
            </td>
            <td className='align-middle text-center'>
                {skus.reduce((accumulator, obj) => {
                    if (obj.sku === sku.sku) {
                        return accumulator + 1;
                    }
                    return accumulator;
                }, 0)}
            </td>
            <td className='align-middle text-end'>
                <Button
                    className='me-1 shadow'
                    onClick={() => handleOpenForm(sku.sku_id)}
                >
                    <i className='bi bi-pencil-square'></i>
                </Button>

                <Button
                    className='me-1 text-white shadow'
                    variant='danger'
                    onClick={() => handleSkuDelete(sku.sku_id)}
                >
                    <i className='bi bi-trash3' />
                </Button>
            </td>
        </tr>
    );

    // Funciones para manejar las acciones de editar y eliminar
    const handleOpenForm = async (skuId) => {
        // Lógica para editar el SKU con el ID dado
        const skuToEdit = skus.find((sku) => sku.sku_id === skuId);

        console.log(skuToEdit);

        if (skuToEdit) {
            setSkuToEdit(skuToEdit);
            setFormValues({
                active: skuToEdit.active,
                description: skuToEdit.description,
                minimumStock: skuToEdit.minimum_stock || 0,
                name: skuToEdit.name,
                price: skuToEdit.price,
                sku: skuToEdit.sku,
            });

            setOriginalActiveState(skuToEdit.active);
        }

        handleModalChange();
        // setShowWarning(!skuToEdit.active);
    };

    const handleSkuDelete = async (skuId) => {
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
            const { status } = await changeActiveStateSku(skuId, false);

            if (status === 'success') {
                Swal.fire('Eliminado', 'El SKU ha sido eliminado.', 'success');
            } else {
                Swal.fire(
                    'Error',
                    'Ha habido un problema al eliminar el SKU.',
                    'error',
                );
            }
        }
    };

    const handleInputChangeWithWarning = ({ target }) => {
        handleInputChange({ target }); // Llamada al handleInputChange original

        // Mostrar u ocultar el mensaje de advertencia
        if (target.name === 'active' && originalActiveState) {
            setShowWarning(!target.checked);
        }
    };

    // Función para abrir y cerrar el modal
    const handleModalChange = () => {
        if (showModal) {
            reset();
            setOriginalActiveState(true);
            setShowWarning(false);
        }
        setShowModal(!showModal);
    };

    const handleUpdateSku = async () => {
        const { sku_id: skuIdToEdit } = skuToEdit;

        console.log(skuIdToEdit);
        if (isFormValid()) {
            try {
                await updateSku(skuIdToEdit, formValues);

                // Actualizar el estado de Redux
                const updatedSkus = skus.map((sku) => {
                    if (sku.sku_id === skuIdToEdit) {
                        return { ...sku, ...formValues };
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

    return (
        <>
            <ModalSku
                formValues={formValues}
                handleInputChange={handleInputChange}
                handleInputChangeWithWarning={handleInputChangeWithWarning}
                handleModalChange={handleModalChange}
                handleUpdateSku={handleUpdateSku}
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
                setShowInactive={setShowInactive}
                showInactive={showInactive}
                title='SKUs'
            />
        </>
    );
};
