import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { CustomBarChart } from '../../../../shared/ui/components/charts/CustomBarChart';
import { useFormik } from 'formik';
import { getLastAddedProducts } from '../../../movements/APIs/movementAPI';

export const InVolumeInfo = ({ outInfo }) => {
    const [entriesData, setEntriesData] = useState([]);

    const getChartData = async () => {
        try {
            const { data } = await getLastAddedProducts();

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
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getChartData();
    }, []);

    const handleSubmit = async (values) => {
        const { startDate, endDate } = values;

        const { data } = await getLastAddedProducts(
            undefined,
            startDate,
            endDate,
        );

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
    };

    const formik = useFormik({
        initialValues: {
            startDate: '',
            endDate: '',
        },
        onSubmit: handleSubmit,
    });

    const { startDate, endDate } = formik.values;

    return (
        <>
            <Row>
                <Col>Entrada</Col>
            </Row>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col xs={5}>
                        <InputGroup size="sm">
                            <InputGroup.Text>Inicio</InputGroup.Text>
                            <Form.Control
                                placeholder="Inicio"
                                type="date"
                                name="startDate"
                                value={startDate}
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
                                value={endDate}
                                onChange={formik.handleChange}
                            />
                        </InputGroup>
                    </Col>
                    <Col xs={2}>
                        <Button className="col-12" size="sm" type="submit">
                            Filtrar
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col xs={12}>
                    <CustomBarChart
                        data={entriesData}
                        xKey="name"
                        yKey="Cantidad"
                        barFill="#8884d8"
                    />
                </Col>
            </Row>
        </>
    );
};
