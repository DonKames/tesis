import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AddUsersModal } from './AddUsersModal';
import { useDispatch } from 'react-redux';
import { UsersSection } from './UsersSection';

export const UsersScreen = () => {
    const dispatch = useDispatch();

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
