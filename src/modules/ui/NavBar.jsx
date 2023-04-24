import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <Navbar
            bg='light'
            expand='lg'
        >
            <Container>
                <Navbar.Brand
                    as={Link}
                    to='./main'
                >
                    Inicio
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link
                            as={Link}
                            to='./tasks'
                        >
                            Tareas
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to='./products'
                        >
                            Productos
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to='./dashboard'
                        >
                            Informes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
