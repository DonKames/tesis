import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

export const SettingsScreen = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h3>Configuraciones</h3>
                        </Card.Header>
                        <Card.Body></Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
