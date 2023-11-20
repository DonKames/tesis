import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Form,
    InputGroup,
    ListGroup,
    Row,
} from 'react-bootstrap';
import { CustomBarChart } from '../../../../../shared/ui/components/charts/CustomBarChart';
import { getLastAddedProducts } from '../../../../movements/APIs/movementAPI';
import { useFormik } from 'formik';
import { InVolumeInfo } from '../InVolumeInfo';

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

    const formik = useFormik({
        initialValues: {
            startDate: '',
            endDate: '',
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Card>
            <Card.Header>Volumen de Entrada y Salida</Card.Header>
            <Card.Body>
                <ListGroup horizontal="lg">
                    <ListGroup.Item className="col-lg-6">
                        <InVolumeInfo />
                        <Row>
                            <Col>Entrada</Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                                <InputGroup size="sm">
                                    <InputGroup.Text>Inicio</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Inicio"
                                        type="date"
                                        name="startDate"
                                        value={formik.values.startDate}
                                        onChange={formik.handleChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={5}>
                                <InputGroup size="sm">
                                    <InputGroup.Text>Termino</InputGroup.Text>
                                    <Form.Control
                                        type="date"
                                        name="endDate"
                                        value={formik.values.endDate}
                                        onChange={formik.handleChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={2} className="text-end">
                                <Button className="col-12" size="sm">
                                    Filtrar
                                </Button>
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
                    <ListGroup.Item className="col-lg-6">
                        <Row>
                            <Col>Salida</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};
