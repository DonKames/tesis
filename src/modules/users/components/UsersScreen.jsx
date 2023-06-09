import React, { useEffect } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { AddUsersModal } from './AddUsersModal';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../apis/apiUsers';
import { usersSetRoles, usersSetUsers } from '../slice/usersSlice';
import { getRoles } from '../apis/apiRoles';

export const UsersScreen = () => {
    const dispatch = useDispatch();

    const { users, roles } = useSelector((state) => state.users);

    useEffect(() => {
        const fetchData = async () => {
            if (!users.length) {
                const fetchedUsers = await getUsers();

                if (!fetchedUsers.isArray) {
                    dispatch(usersSetUsers(fetchedUsers));
                }
            }

            if (!roles.length) {
                const fetchedRoles = await getRoles();
                dispatch(usersSetRoles(fetchedRoles));
            }
        };

        fetchData();
    }, [dispatch]);

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
                            {users?.map((user) => (
                                <tr key={user.user_id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            roles?.find(
                                                (role) =>
                                                    role.role_id ===
                                                    user.fk_role_id,
                                            )?.name
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </Row>
        </Container>
    );
};
