import React from 'react';

import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { SelectRoles } from '../../../shared/ui/components/SelectRoles';

export const ModalEditUser = React.memo(function ModalEditUser({
    formValues,
    handleInputChange,
    handleModalChange,
    handleUpdate,
    showModal,
}) {
    const { name, lastName, email, roleId } = formValues;

    return (
        <Modal show={showModal} onHide={handleModalChange}>
            <Modal.Header className="h1">Editar Usuario</Modal.Header>
            <Modal.Body>
                <Form className="">
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
                        <Form.Control.Feedback type="invalid">
                            Nombre Incorrecto
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            className="mb-3"
                            name="lastName"
                            placeholder="Apellido"
                            type="text"
                            value={lastName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control
                            className="mb-3"
                            name="email"
                            placeholder="E-Mail"
                            type="text"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rol</Form.Label>
                        <SelectRoles
                            onChange={handleInputChange}
                            name="roleId"
                            roleId={roleId}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="btn btn-secondary"
                    onClick={() => handleModalChange()}
                >
                    Cancelar
                </Button>
                <Button
                    className="btn btn-primary"
                    onClick={() => {
                        handleUpdate();
                    }}
                >
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

ModalEditUser.propTypes = {
    formValues: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleModalChange: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
};
