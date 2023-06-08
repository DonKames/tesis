import React, { useState } from 'react';

import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import {
    startLoginEmailPassword,
    startRegisterNameEmailPass,
} from '../actions/auth';
import { getUserByEmail } from '../../users/apis/apiUsers';
import { authIsRegistered } from '../authSlice';
import validator from 'validator';
import Swal from 'sweetalert2';

// import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const { loading } = useSelector((state) => state.ui);

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: '',
    });

    const { email, password } = formValues;

    const [passValues, handlePassInputChange] = useForm({
        newPassword: '123456',
        reNewPassword: '123456',
    });

    const { newPassword, reNewPassword } = passValues;

    let resp;

    const handleLogin = async (e) => {
        e.preventDefault();

        if (isLoginFormValid()) {
            resp = await getUserByEmail(email);

            if (resp) {
                console.log(resp);
                const { uid, first_name, fk_role_id } = resp;

                dispatch(
                    startLoginEmailPassword(
                        email,
                        password,
                        first_name,
                        fk_role_id,
                    ),
                );
                dispatch(authIsRegistered(true));
            } else {
                Swal.fire(
                    'Error',
                    'El Email o Password ingresados no son correctos',
                    'error',
                );
            }
        } else {
            Swal.fire('Error', 'Verifique los datos ingresados', 'error');
        }
    };

    const handleEmailBlur = async () => {
        resp = await getUserByEmail(email);

        console.log(resp);
        if (resp) {
            const { uid, first_name } = resp;

            if (uid === null) {
                dispatch(authIsRegistered(false));

                handleShowModal(true);
            }
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSavePassword = async () => {
        if (newPassword === reNewPassword) {
            resp = await getUserByEmail(email);
            console.log(resp);
            if (resp) {
                console.log(resp);
                const { first_name, fk_role_id } = resp;
                console.log(first_name, fk_role_id, email, newPassword);

                dispatch(
                    startRegisterNameEmailPass(first_name, email, newPassword),
                );

                dispatch(authIsRegistered(true));

                console.log('save password');
            }
        }
    };

    // const handleGoogleLogin = () => {
    //     dispatch(startGoogleLogin());
    // };

    const isLoginFormValid = () => {
        if (!validator.isEmail(email)) {
            return false;
        }

        if (!validator.isLength(password, { min: 6 })) {
            return false;
        }

        return true;
    };

    return (
        <>
            <Modal
                show={showModal}
                onHide={handleCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Primer Ingreso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='text-center'>
                        <p style={{ color: 'red' }}>
                            <b>Ya que es su primer ingreso.</b>
                        </p>
                        <p style={{ color: 'red' }}>
                            <b>
                                Por favor, configure una contraseña para su
                                cuenta.
                            </b>
                        </p>
                        <hr />
                    </Row>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Contraseña'
                                name='newPassword'
                                className='mb-3'
                                value={newPassword}
                                onChange={handlePassInputChange}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Repetir Contraseña</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Repetir Contraseña'
                                name='reNewPassword'
                                className='mb-3'
                                value={reNewPassword}
                                onChange={handlePassInputChange}
                            />
                        </Form.Group>
                        {newPassword !== reNewPassword &&
                            !validator.isEmpty(reNewPassword) && (
                                <h6 className='text-danger'>
                                    Las contraseñas no coinciden
                                </h6>
                            )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='primary'
                        onClick={handleSavePassword}
                    >
                        Guardar Contraseña
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card className='shadow position-absolute top-50 start-50 translate-middle col-10 col-md-4 col-xxl-2 animate__animated animate__fadeIn animate__faster'>
                <Card.Body>
                    <Card.Title
                        className='text-center'
                        tag='h5'
                    >
                        Login
                    </Card.Title>
                    <Form onSubmit={handleLogin}>
                        <Form.Control
                            type='email'
                            placeholder='E-mail'
                            name='email'
                            autoComplete='off'
                            className='mb-3'
                            value={email}
                            onChange={handleInputChange}
                            onBlur={handleEmailBlur}
                        />
                        {!validator.isEmail(email) && (
                            <h6 className='text-danger'>
                                El e-mail no es valido
                            </h6>
                        )}
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            name='password'
                            autoComplete='current-password'
                            className='mb-3'
                            value={password}
                            onChange={handleInputChange}
                        />
                        {!validator.isLength(password, { min: 6 }) && (
                            <h6 className='text-danger'>
                                La contraseña debe tener al menos 6 caracteres
                            </h6>
                        )}
                        <div className='d-grid'>
                            <Button
                                type='submit'
                                color='primary'
                                disabled={loading}
                            >
                                Ingresar
                            </Button>
                        </div>
                        <hr />
                        <Row className='text-center'>
                            <Col>
                                <strong>PRÓXIMAMENTE</strong>
                            </Col>
                        </Row>
                        <div>
                            <p>Ingresa con tu cuenta de:</p>
                            <Card
                                className='google-btn bg-primary'
                                // onClick={handleGoogleLogin}
                            >
                                <div className='d-flex align-items-center'>
                                    <img
                                        className='google-icon bg-white rounded p-1'
                                        height='40'
                                        src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                                        alt='google button'
                                    />
                                    <span className='mb-n1 flex-fill fw-bold text-center align-middle text-white'>
                                        Ingresar con GOOGLE
                                    </span>
                                </div>
                            </Card>
                        </div>
                        {/* <Link
                            className='link'
                            to='/pbl/register'
                        >
                            Crear nueva Cuenta
                        </Link> */}
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
