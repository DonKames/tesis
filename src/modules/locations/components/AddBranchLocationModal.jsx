import React, { useState } from 'react';

import { Button, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';

import { useForm } from '../../../hooks/useForm';
import {
    createBranchLocation,
    getBranchLocations,
} from '../APIs/apiBranchLocation';
import { locationsSetBranchLocations } from '../slice/locationsSlice';

export const AddBranchLocationModal = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const { branches } = useSelector((state) => state.locations);

    const branchOptions = branches.map((branch) => ({
        value: branch.branch_id,
        label: branch.name,
    }));

    const [formValues, handleInputChange, reset] = useForm({
        branchId: '',
        branchLocationName: '',
        description: '',
    });

    const { branchLocationName, description } = formValues;

    const handleCloseModal = () => {
        setShowModal(false);
        reset();
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleBranchChange = (selectedOption) => {
        handleInputChange({
            target: {
                name: 'branchId',
                value: selectedOption ? selectedOption.value : '',
            },
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const response = await createBranchLocation(formValues);

        if (response) {
            Swal.fire({
                icon: 'success',
                title: 'Lugar creado con éxito',
                showConfirmButton: false,
                timer: 1500,
            });

            handleCloseModal();

            const branchLocations = await getBranchLocations();
            dispatch(locationsSetBranchLocations(branchLocations));
        } else {
            console.log(response);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el Lugar',
                text: 'Verifique los datos ingresados',
            });
        }
    };

    return (
        <>
            <Button
                variant='primary'
                onClick={handleOpenModal}
            >
                Agregar Lugar
            </Button>
            <Modal
                show={showModal}
                onHide={handleCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Lugar de Sucursal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className='mb-2'>
                            <Form.Group>
                                <Form.Label>Sucursal</Form.Label>
                                <Select
                                    isSearchable
                                    placeholder='Seleccione la Sucursal'
                                    name='fk_branch_id'
                                    options={branchOptions}
                                    onChange={handleBranchChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>Nombre Lugar</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ingrese el nombre del Lugar'
                                    name='branchLocationName'
                                    value={branchLocationName}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ingrese la descripción del lugar'
                                    name='description'
                                    value={description}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type='button'
                        variant='primary'
                        onClick={handleFormSubmit}
                    >
                        Guardar Lugar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
