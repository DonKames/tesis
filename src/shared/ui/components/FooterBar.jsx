import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Container, Nav, Col } from 'react-bootstrap';
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
            <Navbar className="py-3 mt-auto navbar-dark bg-gradient" bg="dark">
                <Container>
                    <Navbar.Brand className="">
                        <Link to="/">
                            <img
                                src="https://res.cloudinary.com/cloud-kames/image/upload/v1658686010/SIMB/simbLogo_vcpz3g.jpg"
                                width="100"
                                height="100"
                                alt="Keep"
                            />
                            <div className="text-white text-center">RFWID</div>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="footer" />
                    <Navbar.Collapse id="footer">
                        <Nav className="ms-auto me-5">
                            <Col>
                                <h6 className="text-white">Paginas</h6>

                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>

                                <Nav.Link as={Link} to="/">
                                    Suscribir
                                </Nav.Link>

                                <Nav.Link to="/">Nosotros</Nav.Link>
                                <Nav.Link to="/">
                                    Política de privacidad
                                </Nav.Link>
                            </Col>
                            <Col>
                                <h6 className="text-white">Redes</h6>

                                <Nav.Link href="https://www.facebook.com/">
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        className="me-1"
                                    />
                                    Facebook
                                </Nav.Link>
                                <Nav.Link href="https://www.whatsapp.com/">
                                    <FontAwesomeIcon
                                        icon={faWhatsapp}
                                        className="me-1"
                                    />
                                    WhatsApp
                                </Nav.Link>
                                <Nav.Link href="https://www.twitter.com/">
                                    <FontAwesomeIcon
                                        icon={faTwitter}
                                        className="me-1"
                                    />
                                    Twitter
                                </Nav.Link>
                            </Col>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
