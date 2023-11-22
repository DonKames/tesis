import React, { useState } from 'react';
import { Card, Col, Collapse, Row } from 'react-bootstrap';
import usePagination from '../../../../../hooks/usePagination';
import {
    getMovements,
    getMovementsQty,
} from '../../../../movements/APIs/movementAPI';

export const AllMovementsCard = () => {
    const [showMovementsCard, setShowMovementsCard] = useState(true);

    const {
        handlePageChange: handlePageChangeProduct,
        limit: productLimit,
        pagesQty: pagesQtyProduct,
        selectedPage: selectedPageProduct,
        setLimit: setProductLimit,
        setPagesQty,
        setShowInactive,
        showInactive,
    } = usePagination(
        getMovements,
        getMovementsQty,
        productsSetProducts,
        productsSetProductQty,
        productsQty,
        10,
    );

    return (
        <Card className="mb-2">
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
                        <Card.Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam voluptatum, quibusdam, dolorum, quia
                            voluptatem quod quas voluptates voluptate doloremque
                            quos fugiat? Quisquam voluptatum, quibusdam,
                            dolorum, quia voluptatem quod quas voluptates
                            voluptate doloremque quos fugiat?
                        </Card.Text>
                    </Card.Body>
                </div>
            </Collapse>
        </Card>
    );
};
