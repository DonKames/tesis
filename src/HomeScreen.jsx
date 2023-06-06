import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export default function HomeScreen() {
    return (
        <Container
            fluid
            className='d-flex align-items-center justify-content-center vh-100'
        >
            <Row>
                <Col>
                    <Button>
                        <Link
                            to='pbl/login'
                            className='nav-link  ms-3 me-2'
                        >
                            Iniciar sesión
                        </Link>
                    </Button>
                    {/* <Button>
                        <Link
                            to='pbl/register'
                            className='nav-link  ms-3 me-2'
                        >
                            Registrarse
                        </Link>
                    </Button> */}
                </Col>
            </Row>
        </Container>
    );
}
