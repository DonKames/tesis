import React from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { CustomBarChart } from '../../../../../shared/ui/components/charts/CustomBarChart';

export const InOutVolumeCard = () => {
    return (
        <Card>
            <Card.Header>Volumen de Entrada y Salida</Card.Header>
            <Card.Body>
                <ListGroup horizontal>
                    <ListGroup.Item className="col-6">
                        <Row>
                            <Col>Entrada</Col>
                        </Row>
                        <Row>
                            <Col>
                                <CustomBarChart
                                    // data={warehouseData}
                                    xKey="name"
                                    yKey="Cantidad"
                                    barFill="#8884d8"
                                />
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="col-6">Salida</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};
