import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../modules/auth/actions/auth';

export const NavBar = () => {
    const dispatch = useDispatch();

    const { displayName } = useSelector((state) => state.auth);

    const formattedDisplayName = displayName
        ? displayName.charAt(0).toUpperCase() +
          displayName.slice(1).toLowerCase()
        : null;

    console.log(displayName);

    const handleLogout = () => {
        console.log('Logout');
        dispatch(startLogout());
    };

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
                    <Nav>
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
                        <Nav.Link
                            as={Link}
                            to='./locations'
                        >
                            Lugares
                        </Nav.Link>
                    </Nav>
                    <NavDropdown
                        className='ms-auto'
                        title={formattedDisplayName || 'Usuario'}
                        id='basic-nav-dropdown'
                    >
                        <NavDropdown.Item href='#profile'>
                            Perfil
                        </NavDropdown.Item>
                        <NavDropdown.Item href='#settings'>
                            Configuración
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                            <Button
                                onClick={handleLogout}
                                variant='danger'
                            >
                                Cerrar Sesión
                            </Button>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
