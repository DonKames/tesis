import React, { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useForm } from '../../../hooks/useForm';
import {
    createBranchLocation,
    getBranchLocations,
} from '../APIs/apiBranchLocation';

export const AddBranchLocationModal = () => {
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        createBranchLocation(formValues);
        getBranchLocations();
    };

    const handleBranchChange = (selectedOption) => {
        handleInputChange({
            target: {
                name: 'branchId',
                value: selectedOption ? selectedOption.value : '',
            },
        });
    };

    return (
        <>
            <Button
                variant='primary'
                onClick={handleOpenModal}
            >
                Agregar Bodega
            </Button>
            <Modal
                show={showModal}
                onHide={handleCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Bodega</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className='mb-2'>
                            <Form.Group>
                                <Form.Label>Sucursal</Form.Label>
                                <Select
                                    isSearchable
                                    placeholder='Seleccione la Sucursal'
                                    name='branchId'
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
                                    placeholder='Ingrese el nombre de la Bodega'
                                    name='warehouseName'
                                    value={branchLocationName}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Ingrese la descripción del lugar'
                                    name='capacity'
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
                        Guardar Bodega
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
