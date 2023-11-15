import React, { useState } from 'react';
import { Card, ListGroup, Collapse, Row, Col } from 'react-bootstrap';
import { InventoryOverview } from '../InventoryOverview';
import { RecentlyAddedItems } from '../RecentlyAddedItems';
import { LowStockAlerts } from '../LowStockAlerts';

export const InventoryCard = () => {
    const [showInventoryOverview, setShowInventoryOverview] = useState(true);
    const [showRecentlyAdded, setShowRecentlyAdded] = useState(true);
    const [showLowStockAlerts, setShowLowStockAlerts] = useState(true);

    return (
        <Card>
            <Card.Header>Gestión de Inventario</Card.Header>
            <ListGroup variant="flush" className="rounded">
                {/* Sección de Vista General */}
                <ListGroup.Item>
                    <Row>
                        <Col>
                            <Card.Title>Vista General</Card.Title>
                        </Col>
                        <Col className="text-end">
                            {showInventoryOverview ? (
                                <i
                                    className="bi bi-caret-up"
                                    onClick={() =>
                                        setShowInventoryOverview(
                                            !showInventoryOverview,
                                        )
                                    }
                                />
                            ) : (
                                <i
                                    className="bi bi-caret-down"
                                    onClick={() =>
                                        setShowInventoryOverview(
                                            !showInventoryOverview,
                                        )
                                    }
                                />
                            )}
                        </Col>
                    </Row>
                </ListGroup.Item>
                <Collapse in={showInventoryOverview}>
                    <ListGroup.Item>
                        <InventoryOverview />
                    </ListGroup.Item>
                </Collapse>

                {/* Sección de Ítems Recientemente Añadidos */}
                <ListGroup.Item>
                    <Row>
                        <Col>
                            <Card.Title>
                                Ítems Recientemente Añadidos
                            </Card.Title>
                        </Col>
                        <Col className="text-end">
                            {showRecentlyAdded ? (
                                <i
                                    className="bi bi-caret-up"
                                    onClick={() =>
                                        setShowRecentlyAdded(!showRecentlyAdded)
                                    }
                                />
                            ) : (
                                <i
                                    className="bi bi-caret-down"
                                    onClick={() =>
                                        setShowRecentlyAdded(!showRecentlyAdded)
                                    }
                                />
                            )}
                        </Col>
                    </Row>
                </ListGroup.Item>
                <Collapse in={showRecentlyAdded}>
                    <ListGroup.Item>
                        <RecentlyAddedItems />
                    </ListGroup.Item>
                </Collapse>

                {/* Sección de Alertas de Stock Bajo */}
                <ListGroup.Item className={!showLowStockAlerts && 'rounded'}>
                    <Row>
                        <Col>
                            <Card.Title>
                                Ítems Recientemente Añadidos
                            </Card.Title>
                        </Col>
                        <Col className="text-end">
                            {showLowStockAlerts ? (
                                <i
                                    className="bi bi-caret-up"
                                    onClick={() =>
                                        setShowLowStockAlerts(
                                            !showLowStockAlerts,
                                        )
                                    }
                                />
                            ) : (
                                <i
                                    className="bi bi-caret-down"
                                    onClick={() =>
                                        setShowLowStockAlerts(
                                            !showLowStockAlerts,
                                        )
                                    }
                                />
                            )}
                        </Col>
                    </Row>
                </ListGroup.Item>
                <Collapse in={showLowStockAlerts}>
                    <ListGroup.Item>
                        <LowStockAlerts />
                    </ListGroup.Item>
                </Collapse>
            </ListGroup>
        </Card>
    );
};
