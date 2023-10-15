import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { SelectUsers } from '../../../shared/ui/components/SelectUsers';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, getUsersNames } from '../../users/apis/usersAPI';
import { uiSetUsersNames } from '../../../shared/ui/slice/uiSlice';

export const UsersSection = () => {
    const dispatch = useDispatch();

    const { usersNames } = useSelector((state) => state.ui);

    // Local States
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (!usersNames.length) {
                    const usersData = await getUsersNames();
                    dispatch(uiSetUsersNames(usersData));
                    setSelectedUser(usersData[0]);
                    console.log(selectedUser);
                    console.log(usersData);
                }
            };

            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const updateSelectedUser = async (userId) => {
        const userData = await getUserById(userId);

        console.log(userData);

        setSelectedUser(userData);
    };

    return (
        <Card className="shadow h-100 animate__animated animate__fadeIn animate__fast">
            <Card.Header>
                <Row>
                    {/* //TODO Ver si usar o no col-auto */}
                    <Col className="d-flex align-items-center col-auto">
                        <h3 className="mb-0">Usuarios</h3>
                    </Col>
                    <Col>
                        <SelectUsers name="userId" />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Nombre:{' '}
                    {selectedUser?.firstName + ' ' + selectedUser?.lastName}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
