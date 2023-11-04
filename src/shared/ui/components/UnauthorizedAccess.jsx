import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import './UnauthorizedAccess.css'; // Asegúrate de crear este archivo CSS

export const UnauthorizedAccess = () => {
    const navigate = useNavigate();

    const handleGoToMain = () => {
        navigate('/pvt/main');
    };

    return (
        <>
            <div className=""></div>
            <Card
                className="mx-auto mt-auto unauthorized-card"
                style={{ width: '30rem' }}
            >
                <Card.Header className="bg-danger text-white">
                    <Card.Title>Acceso no autorizado</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Su rol no tiene permiso para esta página.
                    </Card.Text>
                    <Button variant="danger" onClick={handleGoToMain}>
                        Regresar al inicio
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
};
