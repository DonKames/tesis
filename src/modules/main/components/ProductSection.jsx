import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { SelectProducts } from '../../../shared/ui/components/SelectProducts';

export const ProductSection = () => {
    const dispatch = useDispatch();

    // Local States
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductChange = () => {};

    return (
        <Card className="shadow h-100 animate__animated animate__fadeIn animate__fast">
            <Card.Header>
                <Row className="d-flex align-items-center">
                    <Col>
                        <h3 className="mb-0">Productos</h3>
                    </Col>
                    <Col>
                        <SelectProducts
                            name="userId"
                            onChange={handleProductChange}
                            userId={selectedProduct?.id}
                        />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>EPC: </Card.Text>
                <Card.Text>Sku: </Card.Text>
                <Card.Text>Bodega: </Card.Text>
                <Card.Text>Estado: </Card.Text>
                <Card.Text></Card.Text>
                <Card.Text></Card.Text>
                <Card.Text></Card.Text>
            </Card.Body>
        </Card>
    );
};
