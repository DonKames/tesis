import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import validator from 'validator';

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

export const TableSkus = () => {
    // Redux States
    const { skus, skusQty } = useSelector((state) => state.products);

    const [showModal, setShowModal] = useState(false);

    // Sku pagination hook
    const {
        selectedPage: selectedPageSku,
        pagesQty: pagesQtySku,
        handlePageChange: handlePageChangeSku,
        setLimit: setSkuLimit,
        limit: skuLimit,
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

    // Sku table row renderer
    const skuRenderer = (sku) => (
        <tr key={sku.sku_id}>
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
                    className='me-1'
                    onClick={() => handleSkuEdit(sku.sku_id)}
                >
                    <i className='bi bi-pencil-square'></i>
                </Button>

                <Button
                    className='text-white'
                    variant='danger'
                    onClick={() => handleSkuDelete(sku.sku_id)}
                >
                    <i className='bi bi-trash3' />
                </Button>
            </td>
        </tr>
    );

    // Funciones para manejar las acciones de editar y eliminar
    const handleSkuEdit = async (skuId) => {
        // Lógica para editar el SKU con el ID dado
        const sku = await skus.find((sku) => sku.sku_id === skuId);
        console.log(sku);

        const [formValues, handleInputChange] = useForm();
        // setSkuEditForm({
        //     active: sku.active,
        //     description: sku.description,
        //     minimum_stock: sku.minimum_stock,
        //     name: sku.name,
        //     price: sku.price,
        //     sku: sku.sku,
        // });
        // console.log(skuEditForm);

        handleModalChange();
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

    const handleModalChange = () => {
        setShowModal(!showModal);
    };

    // Validador de campos

    const isFormValid = () => {
        // active, description, minimumStock, name, sku
        if (!validator.isBoolean(active)) {
            return false;
        }

        if (!validator.isAlphanumeric(description)) {
            return false;
        }

        if (!validator.isLength(description, { max: 255 })) {
            return false;
        }

        if (!validator.isInt(minimumStock)) {
            return false;
        }

        if (!validator.isLength(name, { max: 100 })) {
            return false;
        }

        if (!validator.isLength(sku, { max: 100 })) {
            return false;
        }

        return true;
    };

    const handleUpdateSku = async (skuId) => {
        console.log(formValues);
        if (isFormValid()) {
            try {
                updateSku(skuId, formValues);
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
            <Modal
                show={showModal}
                onHide={handleModalChange}
            >
                <Modal.Header className='h1'>Editar SKU</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                className='mb-3'
                                name='name'
                                onChange={handleInputChange}
                                placeholder='Nombre'
                                type='text'
                                value={name}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>SKU</Form.Label>
                            <Form.Control
                                className='mb-3'
                                name='sku'
                                onChange={handleInputChange}
                                placeholder='SKU'
                                type='text'
                                value={sku}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Stock Mínimo</Form.Label>
                            <Form.Control
                                className='mb-3'
                                name='minimum_stock'
                                onChange={handleInputChange}
                                placeholder='Stock Mínimo'
                                type='number'
                                value={minimumStock}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as={'textarea'}
                                className='mb-3'
                                name='description'
                                onChange={handleInputChange}
                                placeholder='Descripción'
                                type='text'
                                value={description}
                            />
                        </Form.Group>
                        <Form.Group className='d-flex justify-content-center'>
                            <Form.Label className='me-1'>Activo:</Form.Label>
                            <Form.Check
                                className='ms-1'
                                name='active'
                                onChange={handleInputChange}
                                type='switch'
                                value={active}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                        onClick={handleModalChange}
                    >
                        Close
                    </Button>
                    <Button onClick={handleUpdateSku}>Guardar</Button>
                </Modal.Footer>
            </Modal>
            <PaginatedTable
                items={skus}
                columns={tableColumnsSkus}
                selectedPage={selectedPageSku}
                pagesQty={pagesQtySku}
                handlePageChange={handlePageChangeSku}
                itemRenderer={skuRenderer}
                footerText={`Total de SKUs: ${skusQty} | Páginas totales: ${pagesQtySku}`}
                maxPagesToShow={10}
                handleLimitChange={setSkuLimit}
                limit={skuLimit}
            />
        </>
    );
};
