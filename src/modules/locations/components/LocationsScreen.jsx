import React, { useEffect, useRef, useState } from 'react';

import Select from 'react-select';
import {
    Button,
    Col,
    Container,
    Form,
    Modal,
    Row,
    Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../../hooks/useForm';
import { getCountries } from '../../../shared/APIs/apiCountries';
import { getRegions } from '../../../shared/APIs/apiRegions';
import {
    locationsSetCountries,
    locationsSetRegions,
} from '../slice/locationsSlice';

export const LocationsScreen = () => {
    const dispatch = useDispatch();

    const [showAddBranchModal, setShowAddBranchModal] = useState(false);
    const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);

    const { countries, regions } = useSelector((state) => state.locations);

    const countryOptions = countries.map((country) => ({
        value: country.country_id,
        label: country.name,
    }));

    const formRef = useRef(null);

    const [formValues, handleInputChange, reset] = useForm({
        branchName: '',
        country: '',
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
    console.log(country);

    const handleClose = () => setShowAddBranchModal(false);
    const handleShow = () => setShowAddBranchModal(true);

    const handleFormSubmit = (e) => {
        console.log('form submit');
        e.preventDefault();
        console.log(JSON.stringify(formValues));
    };

    useEffect(() => {
        const fetchData = async () => {
            const countries = await getCountries();
            dispatch(locationsSetCountries(countries));

            const regions = await getRegions();
            dispatch(locationsSetRegions(regions));
        };
        fetchData();
    }, []);

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
        <Container fluid>
            <Row className='align-items-center'>
                <Col
                    xs='12'
                    md='6'
                >
                    <Row>
                        <Col>
                            <h1>Sucursales</h1>
                        </Col>
                        <Col className='text-center'>
                            <Button
                                type='button'
                                onClick={handleShow}
                            >
                                Agregar Sucursal
                            </Button>
                        </Col>
                    </Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>Haya yay</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Yay</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col
                    xs='12'
                    md='6'
                >
                    <h1>Bodegas</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>bodega</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>bodega</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal
                show={showAddBranchModal}
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
        </Container>
    );
};
