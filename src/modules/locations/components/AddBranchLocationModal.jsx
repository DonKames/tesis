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

    const handleBranchChange = (selectedOption) => {
        handleInputChange({
            target: {
                name: 'branchId',
                value: selectedOption ? selectedOption.value : '',
            },
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        createBranchLocation(formValues);
        getBranchLocations();
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
