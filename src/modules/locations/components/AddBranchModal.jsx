import React, { useEffect, useState } from 'react';

import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import Select from 'react-select';
import { createBranch } from '../APIs/apiBranches';
import { useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

export const AddBranchModal = () => {
    const [showModal, setShowModal] = useState(false);

    const { countries, regions } = useSelector((state) => state.locations);

    const countryOptions = countries.map((country) => ({
        value: country.country_id,
        label: country.name,
    }));

    const [formValues, handleInputChange, reset] = useForm({
        branchName: '',
        country: 35,
        region: '',
        address: '',
    });

    const { branchName, country, region, address } = formValues;

    const filteredRegions =
        country === '' || country === undefined
            ? []
            : regions.filter((region) => {
                  return region.fk_country_id === country;
              });

    const regionsOptions = filteredRegions.map((region) => ({
        value: region.region_id,
        label: region.name,
    }));

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleFormSubmit = (e) => {
        // console.log('form submit');
        // console.log(JSON.stringify(formValues));
        e.preventDefault();
        createBranch(formValues);
    };

    const handleCountryChange = (selectedOption) => {
        handleInputChange({
            target: {
                name: 'country',
                value: selectedOption ? selectedOption.value : '',
            },
        });
    };

    const handleRegionChange = (selectedOption) => {
        handleInputChange({
            target: {
                name: 'region',
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
                Agregar Sucursal
            </Button>
            <Modal
                show={showModal}
                onHide={handleCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Sucursal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
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
