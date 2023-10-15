import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { SelectSkus } from '../../../shared/ui/components/SelectSkus';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export const SkuSection = () => {
    const dispatch = useDispatch();

    // Local States
    const [selectedSku, setSelectedSku] = useState(null);

    const updateSelectedSku = async (skuId) => {};

    return (
        <Card className="shadow h-100 animate__animated animate__fadeIn animate__fast">
            <Card.Header>
                <Row>
                    <Col>
                        <h3>SKU</h3>
                    </Col>
                    <Col>
                        <SelectSkus
                            name="skuId"
                            handleInputChange={() => {}}
                            skuId={1}
                        />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>SKU:</Card.Text>
                <Card.Text>Nombre:</Card.Text>
                <Card.Text>Cantidad Total:</Card.Text>
                <Card.Text>Stock Mínimo:</Card.Text>
                <Card.Text>Estado:</Card.Text>
                <Card.Text>Descripción:</Card.Text>
            </Card.Body>
        </Card>
    );
};
