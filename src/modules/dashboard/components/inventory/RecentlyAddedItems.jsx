import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { getLastAddedProducts } from '../../../movements/APIs/movementAPI';
import { useDispatch, useSelector } from 'react-redux';
import { movementsSetData } from '../../../movements/movementSlice';
import {
    timestampDate,
    timestampTime,
} from '../../../../shared/utils/stringUtils';

export const RecentlyAddedItems = () => {
    const dispatch = useDispatch();

    const { lastAdded } = useSelector((state) => state.movements);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!lastAdded.length) {
                    const { data } = await getLastAddedProducts(6);

                    // console.log(data);

                    dispatch(movementsSetData({ lastAdded: data }));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <Row>
                {/* <Col xs={12} lg={12}> */}
                <h4>Ítems Recientemente Añadidos</h4>
                {lastAdded.map((m) => (
                    <Col key={m.id} xs={12} lg={4}>
                        <Card className="mb-2">
                            <Card.Header>
                                <Card.Title>
                                    <strong>{m.name}</strong>
                                </Card.Title>
                            </Card.Header>

                            {/*
                                    // * Para ver como queda con lineas separadoras
                                */}
                            {/* <ListGroup>
                                    <ListGroupItem>
                                        <Row className="mb-2">
                                            <Col xs={4}>
                                                <Card.Text>
                                                    Descripción
                                                </Card.Text>
                                            </Col>
                                            <Col xs={1}>
                                                <Card.Text>:</Card.Text>
                                            </Col>
                                            <Col xs={7}>
                                                <Card.Text>
                                                    {m.description}
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                </ListGroup> */}
                            <Card.Body>
                                <Row className="mb-2">
                                    <Col xs={4}>
                                        <Card.Text>Descripción</Card.Text>
                                    </Col>
                                    <Col xs={1}>
                                        <Card.Text>:</Card.Text>
                                    </Col>
                                    <Col xs={7}>
                                        <Card.Text className="text-truncate">
                                            {m.description}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col xs={4}>
                                        <Card.Text>Usuario</Card.Text>
                                    </Col>
                                    <Col xs={1}>
                                        <Card.Text>:</Card.Text>
                                    </Col>
                                    <Col xs={7}>
                                        <Card.Text>
                                            {m.userFirstName +
                                                ' ' +
                                                m.userLastName}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col xs={4}>
                                        <Card.Text>EPC</Card.Text>
                                    </Col>
                                    <Col xs={1}>
                                        <Card.Text>:</Card.Text>
                                    </Col>
                                    <Col xs={7}>
                                        <Card.Text>{m.epc}</Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col xs={4}>
                                        <Card.Text>Fecha</Card.Text>
                                    </Col>
                                    <Col xs={1}>
                                        <Card.Text>:</Card.Text>
                                    </Col>
                                    <Col xs={7}>
                                        <Card.Text>
                                            {timestampDate(m.timestamp)} -{' '}
                                            {timestampTime(m.timestamp)}
                                        </Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                {/* </Col> */}
            </Row>
        </>
    );
};
