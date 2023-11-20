import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { CustomBarChart } from '../../../../shared/ui/components/charts/CustomBarChart';

export const InVolumeInfo = () => {
    return (
        <>
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
        </>
    );
};
