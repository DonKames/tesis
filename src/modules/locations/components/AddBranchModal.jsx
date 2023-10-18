import React, { useState } from 'react';

import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { createBranch, getBranches } from '../APIs/branchesAPI';
import { useForm } from '../../../hooks/useForm';
import { getWarehouses } from '../APIs/warehouseAPI';
import {
    locationsSetBranches,
    locationsSetWarehouses,
} from '../slice/locationsSlice';
import { SelectCountries } from '../../../shared/ui/components/SelectCountries';
import { SelectRegions } from '../../../shared/ui/components/SelectRegions';
import { SelectMunicipalities } from '../../../shared/ui/components/SelectMunicipalities';

export const AddBranchModal = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const { countries, regions } = useSelector((state) => state.locations);

    const countryOptions = countries.map((country) => ({
        value: country.country_id,
        label: country.name,
    }));

    const [formValues, handleInputChange, reset] = useForm({
        address: '',
        branchName: '',
        country: 35,
        municipality: 0,
        region: 0,
    });

    const { branchName, country, address, municipality, region } = formValues;

    /* eslint-disable indent */
    const filteredRegions =
        country === '' || country === undefined
            ? []
            : regions.filter((region) => {
                  return region.fk_country_id === country;
              });
    /* eslint-enable indent */

    const regionsOptions = filteredRegions.map((region) => ({
        value: region.region_id,
        label: region.name,
    }));

    const handleCloseModal = () => {
        setShowModal(false);
        reset();
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleFormSubmit = async (e) => {
        // console.log('form submit');
        // console.log(JSON.stringify(formValues));
        e.preventDefault();
        const response = await createBranch(formValues);

        if (response) {
            Swal.fire({
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                title: 'Sucursal creada con éxito',
            });

            handleCloseModal();

            console.log('entro al AddBranchModal');
            const branches = await getBranches();
            dispatch(locationsSetBranches(branches));

            const warehouses = await getWarehouses();
            dispatch(locationsSetWarehouses(warehouses));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar la sucursal',
                text: 'Ha ocurrido un error al intentar agregar la sucursal. Por favor, inténtalo nuevamente.',
            });
        }
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
            <Button variant="primary" onClick={handleOpenModal}>
                Agregar Sucursal
            </Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Sucursal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre Sucursal</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el nombre de la Sucursal"
                                        name="branchName"
                                        value={branchName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>País</Form.Label>
                                    <SelectCountries
                                        handleInputChange={handleInputChange}
                                        name="country"
                                        countryId={country}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Región</Form.Label>
                                    <SelectRegions
                                        handleInputChange={handleInputChange}
                                        name="region"
                                        regionId={region}
                                        selectedCountry={country}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Comuna</Form.Label>
                            <SelectMunicipalities
                                handleInputChange={handleInputChange}
                                name="municipality"
                                municipalityId={municipality}
                                selectedRegion={region}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la Dirección"
                                name="address"
                                value={address}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        variant="primary"
                        onClick={handleFormSubmit}
                    >
                        Guardar Sucursal
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
