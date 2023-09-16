import React, { useEffect, useState } from 'react';

import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';
import validator from 'validator';

import { useForm } from '../../../hooks/useForm';
import { createUser, getUsers } from '../apis/apiUsers';
import { usersSetUsers } from '../slice/usersSlice';
import { uiSetError } from '../../../shared/ui/slice/uiSlice';

export const AddUsersModal = () => {
    const dispatch = useDispatch();

    const { roles } = useSelector((state) => state.users);
    const { msgError } = useSelector((state) => state.ui);
    const { role: authRole } = useSelector((state) => state.auth);
    console.log(authRole);

    const [showModal, setShowModal] = useState(false);

    const roleOptions = roles.map((role) => ({
        value: role.role_id,
        label: role.name,
    }));

    const [formValues, handleInputChange, reset] = useForm({
        name: 'Nombre',
        lastName: 'Apellido',
        role: '',
        email: 'a@a.com',
    });

    const { name, lastName, email, role } = formValues;

    useEffect(() => {
        if (msgError) {
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el usuario',
                text: msgError,
            });
        }
    }, [msgError]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        reset();
    };

    const isFormValid = async () => {
        if (
            email.trim().length === 0 ||
            name.trim().length === 0 ||
            lastName.trim().length === 0
        ) {
            const msgError = 'Todos los campos son obligatorios';
            dispatch(uiSetError(msgError));
            return false;
        } else if (!validator.isEmail(email)) {
            const msgError = 'El email no es válido';
            dispatch(uiSetError(msgError));
            return false;
        } else if (!validator.isAlpha(name) || !validator.isAlpha(lastName)) {
            const msgError = 'El nombre y apellido no pueden contener números';
            dispatch(uiSetError(msgError));
            return false;
        } else if (!validator.isNumeric(role.toString())) {
            const msgError = 'El rol debe ser una opción válida';
            dispatch(uiSetError(msgError));
            return false;
        } else if (!validator.isEmail(email)) {
            const msgError = 'El email no es válido';
            dispatch(uiSetError(msgError));
            return false;
        }

        return true;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let response;

        if (await isFormValid()) {
            console.log('no es error de validación');
            response = await createUser(formValues);
        }

        console.log(response);

        if (response?.status === 201) {
            // try {
            //     dispatch(
            //         startRegisterNewUserNameEmailPass(
            //             name,
            //             email,
            //             temporalPass,
            //         ),
            //     );
            // } catch (error) {
            //     console.log('Error al registrar en firebase', error);
            // }

            Swal.fire({
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                title: 'Usuario creado con éxito',
            });

            handleCloseModal();

            const users = await getUsers();
            dispatch(usersSetUsers(users));
            handleCloseModal();
        } else {
            console.log(response);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el usuario',
                text: response || msgError,
            });
        }
    };

    const handleRoleChange = (selectedRole) => {
        handleInputChange({
            target: {
                name: 'role',
                value: selectedRole ? selectedRole.value : '',
            },
        });
    };

    return (
        <>
            {authRole === 1 && (
                <Button variant="primary" onClick={handleOpenModal}>
                    Agregar Usuario
                </Button>
            )}
            <Modal onHide={handleCloseModal} show={showModal}>
                <Modal.Header>
                    <Modal.Title>
                        <h1>Agregar Usuario</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Nombre Usuario</Form.Label>
                                    <Form.Control
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Ingrese el nombre del usuario"
                                        name="name"
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                    {!validator.isAlpha(name) && (
                                        <h6 className="text-danger">
                                            El nombre no puede contener números
                                            o caracteres especiales
                                        </h6>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Apellido Usuario</Form.Label>
                                    <Form.Control
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Ingrese el apellido del usuario"
                                        name="lastName"
                                        value={lastName}
                                        onChange={handleInputChange}
                                    />
                                    {!validator.isAlpha(lastName) && (
                                        <h6 className="text-danger">
                                            El apellido no puede contener
                                            números o caracteres especiales
                                        </h6>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Rol Usuario</Form.Label>
                                    <Select
                                        isSearchable
                                        name="role"
                                        options={roleOptions}
                                        onChange={handleRoleChange}
                                        placeholder="Seleccione un rol"
                                        // defaultValue={roleOptions[0]}
                                    />
                                </Form.Group>
                                {!role && (
                                    <h6 className="text-danger">
                                        Por favor, seleccione un rol.
                                    </h6>
                                )}
                                {/* {role && !isValidRole(role) && (
                                    <h6 className='text-danger'>
                                        El rol seleccionado no es válido.
                                    </h6>
                                )} */}
                                <Form.Group>
                                    <Form.Label>E-mail Usuario</Form.Label>
                                    <Form.Control
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Ingrese el e-mail del usuario"
                                        name="email"
                                        value={email}
                                        onChange={handleInputChange}
                                    />
                                    {!validator.isEmail(email) &&
                                        validator.isLength(email, {
                                            min: 6,
                                        }) &&
                                        !validator.isEmpty(email) && (
                                            <h6 className="text-danger">
                                                El e-mail no es válido
                                            </h6>
                                        )}
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        variant="primary"
                        onClick={handleFormSubmit}
                    >
                        Guardar Usuario
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
