import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
    Button,
    Col,
    Container,
    Dropdown,
    Form,
    Modal,
    Row,
    Table,
} from 'react-bootstrap';
import { getCountries } from '../../../shared/APIs/apiCountries';
import { useDispatch, useSelector } from 'react-redux';
import { uiSetCountries } from '../../../shared/ui/uiSlice';
import { useForm } from '../../../hooks/useForm';

export const LocationsScreen = () => {
    const dispatch = useDispatch();

    const [showAddBranchModal, setShowAddBranchModal] = useState(false);
    const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const uiState = useSelector((state) => state.ui);
    const countryOptions = uiState.countries.map((country) => ({
        value: country.name,
        label: country.name,
    }));

    const handleClose = () => setShowAddBranchModal(false);
    const handleShow = () => setShowAddBranchModal(true);

    const { values, handleInputChange, reset } = useForm({
        branch: '',
        country: '',
        region: '',
        address: '',
    });

    const { branch, country, region, address } = values;

    useEffect(() => {
        const fetchData = async () => {
            const countries = await getCountries();
            dispatch(uiSetCountries(countries));
        };
        fetchData();
    }, []);

    const handleInputCountryChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const filtered = options.filter((option) =>
            option.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredOptions(filtered);
    };

    const handleOptionClick = () => {};
    const handleOnFocusCountry = () => {
        setShowDropdown(true);
    };
    const handleOnBlurCountry = () => {
        console.log(document);
        //setShowDropdown(false);
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
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Nombre Sucursal</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese el nombre de la Sucursal'
                                        name='branch'
                                        // value={productName}
                                        // onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <Form.Group>
                                        <Form.Label>País</Form.Label>
                                        <Select
                                            options={countryOptions}
                                            isSearchable
                                        />
                                        {/* <Form.Control
                                            type='text'
                                            placeholder='Ingrese el nombre del país'
                                            name='productName'
                                            // value={productName}
                                            onChange={handleInputCountryChange}
                                            onFocus={handleOnFocusCountry}
                                            onBlur={handleOnBlurCountry}
                                        /> */}
                                    </Form.Group>
                                </Row>
                                {/* <Row>
                                    <Col>
                                        <Dropdown.Menu
                                            show={showDropdown}
                                            className='dropdown-menu-scroll'
                                        >
                                            {uiState.countries.map(
                                                (country, index) => (
                                                    <Dropdown.Item
                                                        key={index}
                                                        onClick={
                                                            handleOptionClick
                                                        }
                                                    >
                                                        {country.name}
                                                    </Dropdown.Item>
                                                ),
                                            )}
                                        </Dropdown.Menu>
                                    </Col>
                                </Row> */}
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Región</Form.Label>
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
                        variant='primary'
                        onClick={handleClose}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
