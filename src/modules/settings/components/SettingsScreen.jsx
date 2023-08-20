import React from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';

export const SettingsScreen = () => {
    return (
        <Container>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Card style={{ display: 'inline-block', width: 'auto' }}>
                        <Card.Header>
                            <h3>Configuraciones</h3>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Text>Bodega Principal: </Card.Text>
                                </Col>
                                <Col>
                                    <Form.Select></Form.Select>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
