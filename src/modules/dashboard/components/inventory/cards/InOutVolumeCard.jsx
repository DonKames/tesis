import React, { useEffect, useState } from 'react';
import {
    Card,
    Col,
    FloatingLabel,
    Form,
    ListGroup,
    Row,
} from 'react-bootstrap';
import { CustomBarChart } from '../../../../../shared/ui/components/charts/CustomBarChart';
import { getLastAddedProducts } from '../../../../movements/APIs/movementAPI';

export const InOutVolumeCard = () => {
    const [entriesData, setEntriesData] = useState([]);

    const getChartData = async () => {
        try {
            const { data } = await getLastAddedProducts();

            console.log(data);

            const totalsByWarehouse = data.reduce((acc, item) => {
                // Si el warehouseName ya existe en el acumulador, incrementa el contador
                if (acc[item.warehouseName]) {
                    acc[item.warehouseName]++;
                } else {
                    // Si no, inicializa el contador para ese warehouseName
                    acc[item.warehouseName] = 1;
                }
                return acc;
            }, {});

            const formattedData = Object.entries(totalsByWarehouse).map(
                ([name, Cantidad]) => {
                    return { name, Cantidad };
                },
            );

            setEntriesData(formattedData);

            console.log(formattedData);

            // const formattedData = {
            //     name: 'Entrada',
            //     Cantidad: parseInt(data.qty),
            // };
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getChartData();
    }, []);
    return (
        <Card>
            <Card.Header>Volumen de Entrada y Salida</Card.Header>
            <Card.Body>
                <ListGroup horizontal="lg">
                    <ListGroup.Item className="">
                        <Row>
                            <Col>Entrada</Col>
                            <Col>
                                <Form.Group>
                                    <FloatingLabel label="Inicio">
                                        <Form.Control type="date" />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <FloatingLabel label="Termino">
                                        <Form.Control type="date" />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CustomBarChart
                                    data={entriesData}
                                    xKey="name"
                                    yKey="Cantidad"
                                    barFill="#8884d8"
                                />
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="">Salida</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};
