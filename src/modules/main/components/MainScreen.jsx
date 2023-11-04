import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { updateUserUid } from '../../users/apis/usersAPI';
import { GeneralSection } from './GeneralSection';
import { WarehouseSection } from './WarehouseSection';
import { BranchSection } from './BranchSection';
import { UserSection } from './UsersSection';
import { SkuSection } from './SkuSection';
import { ProductSection } from './ProductSection';

export const MainScreen = () => {
    // Redux states
    const { isRegistered, email, uid, role } = useSelector(
        (state) => state.auth,
    );

    if (!isRegistered) {
        console.log('no registrado');
        updateUserUid(email, uid);
    }

    const hasAccess = role === 1 || role === 2;

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
            <Row
                className={`my-3 ${
                    hasAccess
                        ? 'justify-content-evenly'
                        : 'justify-content-evenly'
                }`}
            >
                <Col xs={12} md={6} lg={3}>
                    <SkuSection />
                </Col>
                <Col xs={12} md={6} lg={3}>
                    <ProductSection />
                </Col>
                {hasAccess && (
                    <Col xs={12} md={6} lg={3}>
                        <UserSection />
                    </Col>
                )}
            </Row>
        </Container>
    );
};
