import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import { InVolumeInfo } from '../InVolumeInfo';
import { OutVolumeInfo } from '../OutVolumeInfo';

export const InOutVolumeCard = () => {
    return (
        <Card>
            <Card.Header>Volumen de Entrada y Salida</Card.Header>
            <Card.Body>
                <ListGroup horizontal="xxl">
                    <ListGroup.Item className="col-xxl-6">
                        <InVolumeInfo />
                    </ListGroup.Item>
                    <ListGroup.Item className="col-xxl-6">
                        <OutVolumeInfo />
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};
