import React, { useState } from 'react';
import { Card, Col, Collapse, Row } from 'react-bootstrap';
import { MovementsTable } from '../tables/MovementsTable';

export const AllMovementsCard = () => {
    const [showMovementsCard, setShowMovementsCard] = useState(true);

    return (
        <Card className="mb-2 shadow">
            <Card.Header>
                <Row xs={11}>
                    <Col>
                        <Card.Title>Historial de Movimientos</Card.Title>
                    </Col>
                    <Col
                        xs={1}
                        className="text-end"
                        onClick={() => setShowMovementsCard(!showMovementsCard)}
                    >
                        {showMovementsCard ? (
                            <i
                                className="bi bi-caret-up"
                                // onClick={() =>
                                //     setShowMovementsCard(!showMovementsCard)
                                // }
                            />
                        ) : (
                            <i
                                className="bi bi-caret-down"
                                // onClick={() =>
                                //     setShowMovementsCard(!showMovementsCard)
                                // }
                            />
                        )}
                    </Col>
                </Row>
            </Card.Header>
            <Collapse in={showMovementsCard}>
                <div>
                    <Card.Body>
                        <MovementsTable />
                    </Card.Body>
                </div>
            </Collapse>
        </Card>
    );
};
