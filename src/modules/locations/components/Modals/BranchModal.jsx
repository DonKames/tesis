import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { SelectRegions } from '../../../../shared/ui/components/SelectRegions';
import { SelectCountries } from '../../../../shared/ui/components/SelectCountries';
import { SelectMunicipalities } from '../../../../shared/ui/components/SelectMunicipalities';

export const BranchModal = ({
    title = 'Te falto agregar el titulo',
    formik,
    showModal,
    toggleModal,
    primaryButtonText = 'Guardar',
}) => {
    return (
        <Modal show={showModal} onHide={() => toggleModal(false)}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
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
                                    countryId={formik.values.country}
                                    errorMessage={formik.errors.country}
                                    name="country"
                                    setFieldTouched={formik.setFieldTouched}
                                    setFieldValue={formik.setFieldValue}
                                    isInvalid={
                                        formik.touched.country &&
                                        !!formik.errors.country
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="mb-0 ms-1">
                                    Región
                                </Form.Label>
                                <SelectRegions
                                    errorMessage={formik.errors.region}
                                    name="region"
                                    regionId={formik.values.region}
                                    selectedCountry={formik.values.country}
                                    setFieldTouched={formik.setFieldTouched}
                                    setFieldValue={formik.setFieldValue}
                                    isInvalid={
                                        formik.touched.region &&
                                        !!formik.errors.region
                                    }
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
                                    municipalityId={formik.values.municipality}
                                    selectedRegion={formik.values.region}
                                    isInvalid={
                                        formik.touched.municipality &&
                                        !!formik.errors.municipality
                                    }
                                    errorMessage={formik.errors.municipality}
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
                        {primaryButtonText}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

BranchModal.propTypes = {
    title: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    primaryButtonText: PropTypes.string,
};
