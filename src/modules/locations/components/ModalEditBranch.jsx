import React from 'react';
import { Form, Modal } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { SelectCountries } from '../../../shared/ui/components/SelectCountries';
import { SelectRegions } from '../../../shared/ui/components/SelectRegions';
import { SelectMunicipalities } from '../../../shared/ui/components/SelectMunicipalities';

export const ModalEditBranch = React.memo(function ModalEditBranch({
    formValues,
    handleInputChange,
    handleInputChangeWithWarning,
    handleModalChange,
    handleUpdate,
    showModal,
    showWarning,
}) {
    const { name, country, region, address, municipality } = formValues;

    return (
        <Modal show={showModal} onHide={handleModalChange}>
            <Modal.Header className="h1">Editar Sucursal</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            className="mb-3"
                            name="name"
                            placeholder="Nombre"
                            type="text"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>País</Form.Label>
                        <SelectCountries
                            handleInputChange={handleInputChange}
                            name="country"
                            countryId={country}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Región</Form.Label>
                        <SelectRegions
                            handleInputChange={handleInputChange}
                            name="region"
                            regionId={region}
                            selectedCountry={country}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Comunas</Form.Label>
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
                            className="mb-3"
                            name="address"
                            placeholder="Dirección"
                            type="text"
                            value={address}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

ModalEditBranch.propTypes = {
    formValues: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleInputChangeWithWarning: PropTypes.func.isRequired,
    handleModalChange: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    showWarning: PropTypes.bool.isRequired,
};
