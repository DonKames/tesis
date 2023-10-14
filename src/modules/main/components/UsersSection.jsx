import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { SelectUsers } from '../../../shared/ui/components/SelectUsers';

export const UsersSection = () => {
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
                <Card.Text></Card.Text>
            </Card.Body>
        </Card>
    );
};
