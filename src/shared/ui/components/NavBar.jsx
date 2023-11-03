import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../../modules/auth/actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export const NavBar = () => {
    const dispatch = useDispatch();

    const { displayName, role } = useSelector((state) => state.auth);
    console.log(role);

    const formattedDisplayName = displayName
        ? displayName.charAt(0).toUpperCase() +
          displayName.slice(1).toLowerCase()
        : null;

    const handleLogout = () => {
        console.log('Logout');
        dispatch(startLogout());
    };

    return (
        <Navbar
            bg="dark"
            expand="lg"
            className="shadow-sm mb-3 navbar-dark bg-gradient"
        >
            <Container>
                <Navbar.Brand as={Link} to="./main">
                    Inicio
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="./locations">
                            Lugares
                        </Nav.Link>
                        <Nav.Link as={Link} to="./products">
                            Productos
                        </Nav.Link>

                        <Nav.Link as={Link} to="./dashboard">
                            Informes
                        </Nav.Link>
                        <Nav.Link as={Link} to="./tasks">
                            Tareas
                        </Nav.Link>
                        {(role === 1 || role === 2) && (
                            <Nav.Link as={Link} to="./users">
                                Usuarios
                            </Nav.Link>
                        )}
                    </Nav>
                    <NavDropdown
                        className="ms-auto text-white"
                        // style={{ '--bs-text-opacity': '.55' }}
                        title={formattedDisplayName || 'Usuario'}
                        // id='basic-nav-dropdown'
                    >
                        <NavDropdown.Item href="#profile">
                            Perfil
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/pvt/settings">
                            Configuración
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                            <Button onClick={handleLogout} variant="danger">
                                Cerrar Sesión
                            </Button>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <FontAwesomeIcon icon={faBell} className="ms-2" />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
