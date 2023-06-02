import React from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { AddUsersModal } from './AddUsersModal';

export const UsersScreen = () => {
    return (
        <Container
            fluid
            className='mt-2'
        >
            <Row>
                <Col>
                    <h1>Usuarios</h1>
                </Col>
                <Col className='text-center'>
                    <AddUsersModal />
                </Col>
                <Card>
                    <Table
                        striped
                        hover
                    >
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>E-mail</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapea las sucursales a filas de la tabla */}
                        </tbody>
                    </Table>
                </Card>
            </Row>
        </Container>
    );
};
