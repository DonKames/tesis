import React from 'react';

import { Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { updateUserUid } from '../../users/apis/usersAPI';
import { GeneralSection } from './GeneralSection';
import { WarehouseSection } from './WarehouseSection';
import { BranchSection } from './BranchSection';
import { UserSection } from './UsersSection';
import { SkuSection } from './SkuSection';

export const MainScreen = () => {
    // Redux states
    const { isRegistered, email, uid } = useSelector((state) => state.auth);

    if (!isRegistered) {
        console.log('no registrado');
        updateUserUid(email, uid);
    }

    return (
        <Container fluid>
            <Row>
                <Col className="mb-3" xs={12} lg={6}>
                    <GeneralSection />
                </Col>
                <Col className="mb-3" xs={12} md={6} lg={3}>
                    <BranchSection />
                </Col>
                <Col className="mb-3" xs={12} md={6} lg={3}>
                    <WarehouseSection />
                </Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <SkuSection />
                </Col>
                <Col>
                    <Card
                        // bg='light'
                        className="shadow h-100"
                    >
                        <Card.Header>
                            <h3>Últimos Movimientos</h3>
                        </Card.Header>
                        <Card.Body></Card.Body>
                    </Card>
                </Col>
                <Col xs="12" md="6" lg="3">
                    <UserSection />
                </Col>
            </Row>

            <Row className="my-3"></Row>

            <Row className="my-3">
                <Col>
                    <Card className=" shadow">
                        <Card.Body>
                            <Card.Title>Búsqueda de productos</Card.Title>
                            <Card.Text>
                                Por nombre, código de barras o ubicación: por
                                implementar
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
