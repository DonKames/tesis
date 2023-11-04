import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { UsersSection } from './UsersSection';
import { AddUserModal } from './AddUserModal';

export const UsersScreen = () => {
    return (
        <Container fluid className="mt-2">
            <Row>
                <Col>
                    <Row>
                        <Col className="text-end">
                            <AddUserModal />
                        </Col>
                    </Row>
                    <UsersSection />
                </Col>
            </Row>
        </Container>
    );
};
