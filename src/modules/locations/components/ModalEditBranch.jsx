// Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { SelectRegions } from '../../../shared/ui/components/SelectRegions';
import { SelectMunicipalities } from '../../../shared/ui/components/SelectMunicipalities';
import { SelectCountries } from '../../../shared/ui/components/SelectCountries';
import { getBranchById, updateBranch } from '../APIs/branchesAPI';
import PropTypes from 'prop-types';
import { BranchModal } from './Modals/BranchModal';

const validationSchema = Yup.object({
    branchName: Yup.string().required(
        'El nombre de la sucursal es obligatorio',
    ),
    country: Yup.number()
        .required('El país es obligatorio')
        .notOneOf([0], 'Debe elegir un País'),
    region: Yup.number()
        .required('La región es obligatoria')
        .notOneOf([0], 'Debe elegir una Región'),
    municipality: Yup.number()
        .required('La comuna es obligatoria')
        .notOneOf([0], 'Debe elegir una Comuna'),
    address: Yup.string().required('La dirección es obligatoria'),
});

export const ModalEditBranch = React.memo(function ModalEditBranch({
    handleModalChange,
    branchId,
}) {
    // Local States
    const [showModal, setShowModal] = useState(false);

    const handleFormSubmit = async (values, { errors }) => {
        console.log('click modalEditBranch');
        console.log(values);

        console.log(branchId);
        const response = await updateBranch(branchId, values);

        console.log(response);
    };

    // Formik
    const formik = useFormik({
        initialValues: {
            branchName: '',
            country: 35,
            region: 0,
            municipality: 0,
            address: '',
        },
        validationSchema,
        onSubmit: handleFormSubmit,
    });

    const toggleModal = async (isOpen) => {
        setShowModal(isOpen);
        if (!isOpen) {
            formik.resetForm();
        } else {
            if (branchId) {
                const { data, message } = await getBranchById(branchId);

                if (data) {
                    console.log(data, message);
                    const formikState = {
                        branchName: data.name,
                        country: data.countryId,
                        region: data.regionId,
                        municipality: data.municipalityId,
                        address: data.address,
                    };

                    formik.setValues(formikState);
                }
            }
        }
    };

    return (
        <>
            <Button className="me-1" onClick={() => toggleModal(true)}>
                <i className="bi bi-pencil-square" />
            </Button>
            <BranchModal
                title="Editar Sucursal"
                showModal={showModal}
                toggleModal={toggleModal}
                formik={formik}
            />
            {/* <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>Editar Sucursal</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="mb-0 ms-1">
                                        Nombre Sucursal
                                    </Form.Label>
                                    <Form.Control
                                        className={
                                            formik.touched.branchName &&
                                            formik.errors.branchName
                                                ? 'is-invalid'
                                                : ''
                                        }
                                        type="text"
                                        placeholder="Ingrese el nombre de la Sucursal"
                                        name="branchName"
                                        value={formik.values.branchName}
                                        onChange={formik.handleChange}
                                        isInvalid={
                                            formik.touched.branchName &&
                                            formik.errors.branchName
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.branchName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="mb-0 ms-1">
                                        País
                                    </Form.Label>
                                    <SelectCountries
                                        setFieldValue={formik.setFieldValue}
                                        setFieldTouched={formik.setFieldTouched}
                                        name="country"
                                        countryId={formik.values.country}
                                        isInvalid={
                                            formik.touched.country &&
                                            !!formik.errors.country
                                        }
                                        errorMessage={formik.errors.country}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="mb-0 ms-1">
                                        Región
                                    </Form.Label>
                                    <SelectRegions
                                        setFieldValue={formik.setFieldValue}
                                        setFieldTouched={formik.setFieldTouched}
                                        name="region"
                                        regionId={formik.values.region}
                                        selectedCountry={formik.values.country}
                                        isInvalid={
                                            formik.touched.region &&
                                            !!formik.errors.region
                                        }
                                        errorMessage={formik.errors.region}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="mb-0 ms-1">
                                        Comuna
                                    </Form.Label>
                                    <SelectMunicipalities
                                        setFieldValue={formik.setFieldValue}
                                        setFieldTouched={formik.setFieldTouched}
                                        name="municipality"
                                        municipalityId={
                                            formik.values.municipality
                                        }
                                        selectedRegion={formik.values.region}
                                        isInvalid={
                                            formik.touched.municipality &&
                                            !!formik.errors.municipality
                                        }
                                        errorMessage={
                                            formik.errors.municipality
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="mb-0 ms-1">
                                        Dirección
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese la Dirección"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        isInvalid={
                                            formik.touched.address &&
                                            formik.errors.address
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => toggleModal(false)}
                            variant="secondary"
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary">
                            Agregar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal> */}
        </>
    );
});

ModalEditBranch.propTypes = {
    handleModalChange: PropTypes.func,
    branchId: PropTypes.number.isRequired,
};
