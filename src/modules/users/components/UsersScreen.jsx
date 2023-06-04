import React, { useEffect } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { AddUsersModal } from './AddUsersModal';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../apis/apiUsers';
import { usersSetUsers } from '../slice/usersSlice';

export const UsersScreen = () => {
    const dispatch = useDispatch();

    const { users, roles } = useSelector((state) => state.users);

    useEffect(() => {
        const fetchData = async () => {
            if (!users.length) {
                const fetchedUsers = await getUsers();
                dispatch(usersSetUsers(fetchedUsers));
            }
        };
    });

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
