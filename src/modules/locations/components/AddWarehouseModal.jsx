import React, { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import Select from 'react-select';
import { useForm } from '../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { createWarehouse, getWarehouses } from '../APIs/warehouseAPI';
import Swal from 'sweetalert2';
import { locationsSetWarehouses } from '../slice/locationsSlice';
import { SelectBranches } from '../../../shared/ui/components/SelectBranches';
import { WarehouseModal } from './Modals/WarehouseModal';
import { useFormik } from 'formik';

export const AddWarehouseModal = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const { branches } = useSelector((state) => state.locations);

    const branchOptions = branches.map((branch) => ({
        value: branch.branch_id,
        label: branch.name,
    }));

    const [formValues, handleInputChange, reset] = useForm({
        fk_branch_id: '',
        warehouseName: '',
        capacity: 0,
    });

    const { warehouseName, capacity } = formValues;

    const handleCloseModal = () => {
        setShowModal(false);
        reset();
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const response = await createWarehouse(formValues);

        if (response) {
            Swal.fire({
                icon: 'success',
                title: 'Bodega creada con éxito',
                showConfirmButton: false,
                timer: 1500,
            });

            handleCloseModal();

            const warehouses = await getWarehouses();
            dispatch(locationsSetWarehouses(warehouses));
        } else {
            console.log(response);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la Bodega',
                text: 'Verifique los datos ingresados',
            });
        }
    };

    const handleBranchChange = (selectedOption) => {
        handleInputChange({
            target: {
                name: 'fk_branch_id',
                value: selectedOption ? selectedOption.value : '',
            },
        });
    };

    const formik = useFormik({
        initialValues: {
            branchName: '',
            country: 35,
            region: 0,
            municipality: 0,
            address: '',
        },
        // validationSchema: branchSchema,
        onSubmit: handleFormSubmit,
    });

    return (
        <>
            <Button
                variant="primary"
                onClick={handleOpenModal}
                className="mb-2 shadow-sm"
            >
                Agregar Bodega
            </Button>
            <WarehouseModal
                formik={formik}
                showModal={showModal}
                toggleModal={setShowModal}
                primaryButtonText="Agregar"
            />
            {/* <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Bodega</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Form.Group>
                                <Form.Label>Sucursal</Form.Label>
                                <SelectBranches />
                                <Select
                                    isSearchable
                                    placeholder="Seleccione la Sucursal"
                                    name="fk_branch_id"
                                    options={branchOptions}
                                    onChange={handleBranchChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>Nombre Bodega</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre de la Bodega"
                                    name="warehouseName"
                                    value={warehouseName}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>Capacidad en m3</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingrese la capacidad de la Bodega"
                                    name="capacity"
                                    value={capacity}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        variant="primary"
                        onClick={handleFormSubmit}
                    >
                        Guardar Bodega
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
};
