import React, { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import Select from 'react-select';
import { useForm } from '../../../hooks/useForm';
import { useSelector } from 'react-redux';
import { createWarehouse } from '../APIs/apiWarehouses';

export const AddWarehouseModal = () => {
    const [showModal, setShowModal] = useState(false);

    const { branches } = useSelector((state) => state.locations);

    const branchOptions = branches.map((branch) => ({
        value: branch.branch_id,
        label: branch.name,
    }));

    const [formValues, handleInputChange, reset] = useForm({
        fk_branch_id: '',
        warehouseName: '',
        capacity: '',
    });

    const { warehouseName, capacity } = formValues;

    const handleCloseModal = () => {
        setShowModal(false);
        reset();
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        createWarehouse(formValues);
    };

    const handleBranchChange = (selectedOption) => {
        handleInputChange({
            target: {
                name: 'fk_branch_id',
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
                        <Row>
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
                                <Form.Label>Nombre Bodega</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ingrese el nombre de la Bodega'
                                    name='warehouseName'
                                    value={warehouseName}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>Capacidad en m3</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Ingrese la capacidad de la Bodega'
                                    name='capacity'
                                    value={capacity}
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
