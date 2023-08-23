import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export const BranchSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { branchesNames } = useSelector((state) => state.ui);

    return (
        <Card className='shadow h-100 animate__animated animate__fadeIn animate__fast'>
            <Card.Header>
                <Row>
                    <Col>
                        <h3>Sucursales</h3>
                    </Col>
                    <Col>
                        <Form.Select></Form.Select>
                    </Col>
                </Row>
            </Card.Header>
        </Card>
    );
};
