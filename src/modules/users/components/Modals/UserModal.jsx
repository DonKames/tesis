import React from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { SelectRoles } from '../../../../shared/ui/components/SelectRoles';

export const UserModal = ({
    title = 'Titulo',
    formik,
    showModal,
    toggleModal,
    primaryButtonText,
    editing,
}) => {
    const { name, lastName, email, roleId } = formik.values;

    return (
        <Modal show={showModal} onHide={() => toggleModal(false)}>
            <Modal.Header>
                <Modal.Title className="fs-2">{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-2">
                        <FloatingLabel label="Nombre">
                            <Form.Control
                                className={
                                    formik.touched.name && formik.errors.name
                                        ? 'is-invalid'
                                        : ''
                                }
                                name="name"
                                placeholder="Nombre"
                                type="text"
                                value={name}
                                onChange={formik.handleChange}
                                isInvalid={
                                    formik.touched.name && formik.errors.name
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.name}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <FloatingLabel label="Apellido">
                            <Form.Control
                                name="lastName"
                                placeholder="Apellido"
                                type="text"
                                value={lastName}
                                onChange={formik.handleChange}
                                isInvalid={
                                    formik.touched.lastName &&
                                    formik.errors.lastName
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.lastName}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <FloatingLabel label="Correo electrónico">
                            <Form.Control
                                disabled={editing}
                                name="email"
                                placeholder="E-Mail"
                                type="text"
                                value={email}
                                onChange={formik.handleChange}
                                isInvalid={
                                    formik.touched.email && formik.errors.email
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.email}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="">
                        <SelectRoles
                            isInvalid={
                                formik.touched.roleId && !!formik.errors.roleId
                            }
                            errorMessage={formik.errors.roleId}
                            name="roleId"
                            roleId={roleId}
                            setFieldTouched={formik.setFieldTouched}
                            setFieldValue={formik.setFieldValue}
                        />
                    </Form.Group>
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

UserModal.propTypes = {
    title: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    primaryButtonText: PropTypes.string,
    editing: PropTypes.bool.isRequired,
};
