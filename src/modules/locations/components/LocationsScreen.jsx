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
import {
    locationsSetCountries,
    locationsSetRegions,
} from '../slice/locationsSlice';
import { getRegions } from '../APIs/apiRegions';
import { getCountries } from '../APIs/apiCountries';
import { createBranch } from '../APIs/apiBranches';
import { AddWarehouseModal } from './AddWarehouseModal';

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
        createBranch(formValues);
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
            <AddWarehouseModal />
        </Container>
    );
};
