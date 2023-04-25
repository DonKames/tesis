import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

export const DashboardScreen = () => {
    return (
        <Container>
            <Row className='my-3'>
                <Col>
                    <h1>Informes</h1>
                </Col>
            </Row>
            <Row className='my-3'>
                <Col>
                    <Card>
                        <Card.Header as='h5'>
                            Volumen entrada y salida
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Dashboard</Card.Title>
                            <Card.Text>Lorem ipsum</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='my-3'>
                <Col>
                    <Card>
                        <Card.Header as='h5'>Inventario Actual</Card.Header>
                        <Card.Body>
                            <Card.Title>Dashboard</Card.Title>
                            <Card.Text>Lorem ipsum</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='my-3'>
                <Col>
                    <Card>
                        <Card.Header as='h5'>Estado Actual</Card.Header>
                        <Card.Body>
                            <Card.Title>Dashboard</Card.Title>
                            <Card.Text>Lorem ipsum</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

// const informesData = [
//     {
//         key: '1',
//         movimiento: 'Entrada',
//         producto: 'Producto 1',
//         fecha: '2023-04-25',
//         bodega: 'Bodega 1',
//         cantidad: 10,
//     },
//     {
//         key: '2',
//         movimiento: 'Salida',
//         producto: 'Producto 2',
//         fecha: '2023-04-24',
//         bodega: 'Bodega 2',
//         cantidad: 5,
//     },
//     {
//         key: '3',
//         movimiento: 'Entrada',
//         producto: 'Producto 3',
//         fecha: '2023-04-23',
//         bodega: 'Bodega 1',
//         cantidad: 20,
//     },
// ];
// const columns = [
//     {
//         title: 'Movimiento',
//         dataIndex: 'movimiento',
//         key: 'movimiento',
//     },
//     {
//         title: 'Producto',
//         dataIndex: 'producto',
//         key: 'producto',
//     },
//     {
//         title: 'Fecha',
//         dataIndex: 'fecha',
//         key: 'fecha',
//     },
//     {
//         title: 'Bodega',
//         dataIndex: 'bodega',
//         key: 'bodega',
//     },
//     {
//         title: 'Cantidad',
//         dataIndex: 'cantidad',
//         key: 'cantidad',
//     },
//     {
//         title: '',
//         key: 'action',
//         render: () => (
//             <Button
//                 type='primary'
//                 onClick={() => setModalVisible(true)}
//             >
//                 Ver estadísticas
//             </Button>
//         ),
//     },
// ];
