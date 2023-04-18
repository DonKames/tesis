import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";


//import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';


export const LoginScreen = () => {

    const dispatch = useDispatch();

    //const { loading } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        email: 'camilo@hotmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    };

    return (
            <Card
            className='shadow position-absolute top-50 start-50 translate-middle col-10 col-md-4 col-xxl-2 animate__animated animate__fadeIn animate__faster'
            >
                <Card.Body>
                    <Card.Title className='text-center' tag="h5">
                        Login
                    </Card.Title>
                    <Form
                        // onSubmit={handleLogin}
                    >
                        <Form.Control
                            type='email'
                            placeholder='E-mail'
                            name='email'
                            autoComplete='off'
                            className='mb-3'
                            // value={email}
                            // onChange={handleInputChange}
                        />
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            name='password'
                            autoComplete='current-password'
                            className='mb-3'
                            // value={password}
                            // onChange={handleInputChange}
                        />
                        <div className='d-grid'>
                        <Button
                                type='submit'
                                color='primary'
                                // disabled={loading}
                            >
                                Ingresar
                            </Button>
                        </div>
                        <hr />
                        <div>
                            <p>Ingresa con tu cuenta de:</p>
                            <Card
                                className="google-btn bg-primary"
                                // onClick={handleGoogleLogin}
                            >
                                <div className='d-flex align-items-center'>
                                    <img className="google-icon bg-white h-auto rounded p-1" height={40} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                    <span className='mb-n1 flex-fill fw-bold text-center align-middle text-white'>Ingresar con GOOGLE</span>
                                </div>
                            </Card>
                        </div>
                        <Link
                            className='link'
                            to="/pbl/register"
                        >
                            Crear nueva Cuenta
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
    );
};