import React, { useEffect, useState } from 'react';
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
import { getCountries } from '../../../shared/APIs/apiCountries';
import { useDispatch, useSelector } from 'react-redux';
import { uiSetCountries } from '../../../shared/ui/uiSlice';
import { useForm } from '../../../hooks/useForm';
import { getRegions } from '../../../shared/APIs/apiRegions';
import { locationsSetRegions } from '../slice/locationsSlice';

export const LocationsScreen = () => {
    const dispatch = useDispatch();

    const [showAddBranchModal, setShowAddBranchModal] = useState(false);
    const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);

    const uiState = useSelector((state) => state.ui);
    const locationsState = useSelector((state) => state.locations);

    const countryOptions = uiState.countries.map((country) => ({
        value: country.country_id,
        label: country.name,
    }));

    const regionOptions = locationsState.regions.map((region) => ({
        value: region.region_id,
        label: region.name,
    }));

    const { formValues, handleInputChange, reset } = useForm({
        branchName: '',
        country: '',
        region: '',
        address: '',
    });

    const { branchName, country, region, address } = formValues;

    const filteredRegions = regionOptions.filter(
        (region) => region.fk_country_id === country,
    );

    const handleClose = () => setShowAddBranchModal(false);
    const handleShow = () => setShowAddBranchModal(true);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
    };

    useEffect(() => {
        const fetchData = async () => {
            const countries = await getCountries();
            dispatch(uiSetCountries(countries));

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
                <Modal.Header>Agregar Sucursal</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Row>
                            <Col>
                                <Form.Group>
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
                                <Form.Group>
                                    <Form.Label>País</Form.Label>
                                    <Select
                                        name='country'
                                        options={countryOptions}
                                        onChange={handleCountryChange}
                                        value={countryOptions.find()}
                                        isSearchable
                                        placeholder='Seleccione País'
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Región</Form.Label>
                                    <Select
                                        name='region'
                                        options={
                                            country == '' ? filteredRegions : []
                                        }
                                    />
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el nombre del producto'
                                        name='productName'
                                        // value={productName}
                                        // onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ingrese el nombre del producto'
                                name='productName'
                                // value={productName}
                                // onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        type='submit'
                        variant='primary'
                        // onClick={handleClose}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
