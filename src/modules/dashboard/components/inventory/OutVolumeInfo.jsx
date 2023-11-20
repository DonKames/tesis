import { useFormik } from 'formik';
import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

export const OutVolumeInfo = () => {
    const handleSubmit = async (values) => {
        const { startDate, endDate } = values;
        // const resp = await getLastAddedProducts(undefined, startDate, endDate);
        // console.log(resp);
    };

    const formik = useFormik({
        initialValues: {
            startDate: '',
            endDate: '',
        },
        onSubmit: handleSubmit,
    });

    return (
        <>
            <Row>
                <Col>Salida</Col>
                <Form>
                    <Row>
                        <Col xs={5}>
                            <InputGroup size="sm">
                                <InputGroup.Text>Inicio</InputGroup.Text>
                                <Form.Control type="date" name="startDate" />
                            </InputGroup>
                        </Col>
                        <Col xs={5}>
                            <InputGroup size="sm">
                                <InputGroup.Text>Termino</InputGroup.Text>
                                <Form.Control type="date" name="startDate" />
                            </InputGroup>
                        </Col>
                        <Col>
                            <Button size="sm">Filtrar</Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </>
    );
};
