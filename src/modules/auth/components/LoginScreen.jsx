import React, { useState } from 'react';

import { Button, Card, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
    startLoginEmailPassword,
    startRegisterNameEmailPass,
} from '../actions/auth';
import { getUserByEmail } from '../../users/apis/usersAPI';
import { authIsRegistered } from '../authSlice';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { loginSchema } from '../../../validations/loginSchema';

// import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const { loading } = useSelector((state) => state.ui);

    // const [formValues, handleInputChange] = useForm({
    //     email: '',
    //     password: '',
    // });

    const handleLogin = async () => {
        resp = await getUserByEmail(loginFormik.values.email);

        if (resp) {
            const { uid, first_name, fk_role_id, user_id } = resp;

            dispatch(
                startLoginEmailPassword(
                    email,
                    password,
                    first_name,
                    fk_role_id,
                    user_id,
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
    };

    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: handleLogin,
    });

    // const { email, password } = formValues;

    const { email, password } = loginFormik.values;

    const handleSavePassword = async () => {
        console.log('handleSavePassword');
        if (newPassword === reNewPassword) {
            resp = await getUserByEmail(email);

            if (resp) {
                const { first_name, fk_role_id } = resp;

                console.log(resp);

                dispatch(
                    startRegisterNameEmailPass(first_name, email, newPassword),
                );

                dispatch(authIsRegistered(true));
            }
        }
    };

    const passFormik = useFormik({
        initialValues: {
            newPassword: '123456',
            reNewPassword: '123456',
        },
        onSubmit: handleSavePassword,
    });

    const { newPassword, reNewPassword } = passFormik.values;

    // const [passValues, handlePassInputChange] = useForm({
    //     newPassword: '123456',
    //     reNewPassword: '123456',
    // });

    // const { newPassword, reNewPassword } = passValues;

    let resp;

    const handleEmailBlur = async () => {
        resp = await getUserByEmail(email);

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

    // const handleGoogleLogin = () => {
    //     dispatch(startGoogleLogin());
    // };

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Form onSubmit={passFormik.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Primer Ingreso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="text-center">
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

                        <Form.Group className="mb-3">
                            <FloatingLabel label="Contraseña">
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    name="newPassword"
                                    className="mb-3"
                                    value={newPassword}
                                    onChange={passFormik.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {passFormik.errors.newPassword}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Repetir Contraseña">
                                <Form.Control
                                    type="password"
                                    placeholder="Repetir Contraseña"
                                    name="reNewPassword"
                                    className="mb-3"
                                    value={reNewPassword}
                                    onChange={passFormik.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {passFormik.errors.reNewPassword}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Guardar Contraseña
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Card className="shadow position-absolute top-50 start-50 translate-middle col-10 col-md-4 col-xxl-2 animate__animated animate__fadeIn animate__faster">
                <Card.Body>
                    <Card.Title className="text-center" tag="h5">
                        Login
                    </Card.Title>
                    <Form onSubmit={loginFormik.handleSubmit}>
                        <Form.Group>
                            <FloatingLabel label="E-mail">
                                <Form.Control
                                    className={
                                        loginFormik.touched.email &&
                                        loginFormik.errors.email
                                            ? 'is-invalid mb-3'
                                            : 'mb-3'
                                    }
                                    type="text"
                                    placeholder="E-mail"
                                    name="email"
                                    value={loginFormik.values.email}
                                    onChange={loginFormik.handleChange}
                                    isInvalid={
                                        loginFormik.touched.email &&
                                        loginFormik.errors.email
                                    }
                                    onBlur={handleEmailBlur}
                                    // type="email"
                                    // placeholder="E-mail"
                                    // name="email"
                                    // autoComplete="off"
                                    // className="mb-3"
                                    // value={email}
                                    // onChange={handleInputChange}
                                    // onBlur={handleEmailBlur}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {loginFormik.errors.email}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group>
                            <FloatingLabel label="Contraseña">
                                <Form.Control
                                    className={
                                        loginFormik.touched.password &&
                                        loginFormik.errors.password
                                            ? 'is-invalid mb-3'
                                            : 'mb-3'
                                    }
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={loginFormik.handleChange}
                                    placeholder="Contraseña"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {loginFormik.errors.password}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <div className="d-grid">
                            <Button
                                type="submit"
                                color="primary"
                                disabled={loading}
                            >
                                Ingresar
                            </Button>
                        </div>
                        {/* <hr />
                        <Row className="text-center">
                            <Col>
                                <strong>PRÓXIMAMENTE</strong>
                            </Col>
                        </Row>
                        <div>
                            <p>Ingresa con tu cuenta de:</p>
                            <Card
                                className="google-btn bg-primary"
                                // onClick={handleGoogleLogin}
                            >
                                <div className="d-flex align-items-center">
                                    <img
                                        className="google-icon bg-white rounded p-1"
                                        height="40"
                                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                        alt="google button"
                                    />
                                    <span className="mb-n1 flex-fill fw-bold text-center align-middle text-white">
                                        Ingresar con GOOGLE
                                    </span>
                                </div>
                            </Card>
                        </div> */}
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
