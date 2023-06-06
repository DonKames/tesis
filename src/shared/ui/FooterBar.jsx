import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Navbar, Container, Nav, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
    faFacebook,
    faTwitter,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

export const FooterBar = () => {
    // return (
    //     <footer className='footer mt-auto py-3 bg-light'>
    //         <Container>
    //             <Row>
    //                 <Col>
    //                     <span className='text-muted'>
    //                         Place sticky footer content here.
    //                     </span>
    //                 </Col>
    //             </Row>
    //         </Container>
    //     </footer>
    // );
    return (
        <>
            <Container
                fluid
                className='p-0 footer mt-auto bg-light'
                style={{ backgroundColor: '#2FD7B4' }}
            >
                <Navbar
                    className='py-3 bg-gradient'
                    style={{ backgroundColor: '#2FD7B4' }}
                >
                    <Container>
                        <Navbar.Brand className='text-white'>
                            <Link
                                to='/'
                                className='text-white'
                            >
                                <img
                                    src='https://res.cloudinary.com/cloud-kames/image/upload/v1658686010/SIMB/simbLogo_vcpz3g.jpg'
                                    width='100'
                                    height='100'
                                    alt='Keep'
                                />
                                <div className='text-dark text-center'>
                                    RFWID
                                </div>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='footer' />
                        <Navbar.Collapse id='footer'>
                            <Nav className='ms-auto me-5'>
                                <div>
                                    <div>
                                        <h6>Paginas</h6>
                                    </div>
                                    <div>
                                        <Link
                                            to='/'
                                            className='text-dark'
                                        >
                                            Home
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            to='/'
                                            className='text-dark'
                                        >
                                            Suscribir
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            to='/'
                                            className='text-dark'
                                        >
                                            Nosotros
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            to='/'
                                            className='text-dark'
                                        >
                                            Política de privacidad
                                        </Link>
                                    </div>
                                </div>
                                <div className='ms-5 me-5'>
                                    <div>
                                        <h6>Redes</h6>
                                    </div>
                                    <div>
                                        <a
                                            href='https://www.facebook.com/'
                                            className='text-dark'
                                        >
                                            <FontAwesomeIcon
                                                icon={faFacebook}
                                            />
                                            Facebook
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            href='https://www.whatsapp.com/'
                                            className='text-dark'
                                        >
                                            <FontAwesomeIcon
                                                icon={faWhatsapp}
                                            />
                                            WhatsApp
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            href='https://www.twitter.com/'
                                            className='text-dark'
                                        >
                                            <FontAwesomeIcon icon={faTwitter} />
                                            Twitter
                                        </a>
                                    </div>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
        </>
    );
};
