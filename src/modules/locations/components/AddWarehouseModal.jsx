import React from 'react';

import { Col, Form, Modal, Row } from 'react-bootstrap';
import Select from 'react-select';

export const AddWarehouseModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Modal
                show={showModal}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Sucursal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={handleFormSubmit}
                        ref={formRef}
                    >
                        <Row>
                            <Col>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Nombre Sucursal</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el nombre de la Sucursal'
                                        name='branchName'
                                        value={branchName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className='mb-3'>
                                    <Form.Label>País</Form.Label>
                                    <Select
                                        isSearchable
                                        name='country'
                                        options={countryOptions}
                                        onChange={handleCountryChange}
                                        placeholder='Seleccione País'
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Región</Form.Label>
                                    <Select
                                        isSearchable
                                        name='region'
                                        options={regionsOptions}
                                        onChange={handleRegionChange}
                                        placeholder='Seleccione Región'
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ingrese la Dirección'
                                name='address'
                                value={address}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type='button'
                        variant='primary'
                        onClick={handleFormSubmit}
                    >
                        Guardar Sucursal
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
