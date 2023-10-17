import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { SelectUsers } from '../../../shared/ui/components/SelectUsers';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, getUsersNames } from '../../users/apis/usersAPI';
import { uiSetUsersNames } from '../../../shared/ui/slice/uiSlice';
import { capitalizeFirstLetter } from '../../../shared/utils/stringUtils';

export const UserSection = () => {
    const dispatch = useDispatch();

    const { usersNames } = useSelector((state) => state.ui);

    // Local States
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserChange = async (e) => {
        console.log(e);
        updateSelectedUser(e.target.value);
    };

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (!usersNames.length) {
                    const usersData = await getUsersNames();
                    dispatch(uiSetUsersNames(usersData));

                    updateSelectedUser(usersData[0].id);
                } else {
                    updateSelectedUser(usersNames[0].id);
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

        return userData;
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
                        <SelectUsers
                            name="userId"
                            onChange={handleUserChange}
                            userId={selectedUser?.id}
                        />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Nombre:{' '}
                    <strong>
                        {capitalizeFirstLetter(selectedUser?.name) +
                            ' ' +
                            capitalizeFirstLetter(selectedUser?.lastName)}
                    </strong>
                </Card.Text>
                <Card.Text>
                    Email: <strong>{selectedUser?.email}</strong>
                </Card.Text>
                <Card.Text>
                    Rol: <strong>{selectedUser?.roleName}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
