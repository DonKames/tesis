import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AddUsersModal } from './AddUsersModal';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getUsersQty } from '../apis/apiUsers';
import {
    usersSetRoles,
    usersSetUsers,
    usersSetUsersQty,
} from '../slice/usersSlice';
import { getRoles } from '../apis/apiRoles';
import { UsersSection } from './UsersSection';

export const UsersScreen = () => {
    const dispatch = useDispatch();

    const { users, roles, usersQty } = useSelector((state) => state.users);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (usersQty === null) {
                    const usersQty = await getUsersQty();
                    console.log('UsersScreen: ', usersQty);
                    dispatch(usersSetUsersQty(usersQty));
                }

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
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <Container fluid className="mt-2">
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h1>Usuarios</h1>
                        </Col>
                        <Col className="text-center">
                            <AddUsersModal />
                        </Col>
                    </Row>
                    <UsersSection />
                </Col>
            </Row>
        </Container>
    );
};
