import React, { useState } from 'react';
import { Card, Col, Collapse, ListGroup, Row } from 'react-bootstrap';

import { InVolumeInfo } from '../InVolumeInfo';
import { OutVolumeInfo } from '../OutVolumeInfo';

export const InOutVolumeCard = () => {
    const [showInOutVolume, setShowInOutVolume] = useState(true);

    const outInfo = false;

    return (
        <Card className="mb-2 shadow">
            <Card.Header>
                <Row>
                    <Col xs={10}>
                        <Card.Title>Volumen de Entrada y Salida</Card.Title>
                    </Col>
                    <Col xs={2} className="text-end">
                        {showInOutVolume ? (
                            <i
                                className="bi bi-caret-up"
                                onClick={() =>
                                    setShowInOutVolume(!showInOutVolume)
                                }
                            />
                        ) : (
                            <i
                                className="bi bi-caret-down"
                                onClick={() =>
                                    setShowInOutVolume(!showInOutVolume)
                                }
                            />
                        )}
                    </Col>
                </Row>
            </Card.Header>
            <Collapse in={showInOutVolume}>
                <div>
                    <Card.Body>
                        {outInfo ? (
                            <ListGroup horizontal="xxl">
                                <ListGroup.Item className="col-xxl-6">
                                    <InVolumeInfo outInfo={outInfo} />
                                </ListGroup.Item>

                                <ListGroup.Item className="col-xxl-6">
                                    <OutVolumeInfo />
                                </ListGroup.Item>
                            </ListGroup>
                        ) : (
                            <InVolumeInfo />
                        )}
                    </Card.Body>
                </div>
            </Collapse>
        </Card>
    );
};
