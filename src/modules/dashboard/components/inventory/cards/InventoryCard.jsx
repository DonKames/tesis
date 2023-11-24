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
        <>
            <Card className="mb-2 shadow">
                <Card.Header>
                    <Row>
                        <Col xs={10}>
                            <Card.Title>Vista General</Card.Title>
                        </Col>
                        <Col xs={2} className="text-end">
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
                </Card.Header>
                <Collapse in={showInventoryOverview}>
                    <div>
                        <Card.Body>
                            <InventoryOverview />
                        </Card.Body>
                    </div>
                </Collapse>
            </Card>

            <Card className="mb-2  shadow">
                {/* Sección de Ítems Recientemente Añadidos */}
                <Card.Header>
                    <Row>
                        <Col xs={10}>
                            <Card.Title className="text-truncate">
                                Ítems Recientemente Añadidos
                            </Card.Title>
                        </Col>
                        <Col xs={2} className="text-end">
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
                </Card.Header>
                <Collapse in={showRecentlyAdded}>
                    <div>
                        <Card.Body>
                            <RecentlyAddedItems />
                        </Card.Body>
                    </div>
                </Collapse>
            </Card>

            <Card className="mb-2 shadow">
                {/* Sección de Alertas de Stock Bajo */}
                <Card.Header>
                    <Row>
                        <Col xs={10}>
                            <Card.Title className="text-truncate">
                                Alertas de Stock Bajo
                            </Card.Title>
                        </Col>
                        <Col xs={2} className="text-end">
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
                </Card.Header>
                <Collapse in={showLowStockAlerts}>
                    <div>
                        <Card.Body>
                            <LowStockAlerts />
                        </Card.Body>
                    </div>
                </Collapse>
            </Card>
        </>
    );
};
