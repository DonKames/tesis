import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import { InVolumeInfo } from '../InVolumeInfo';
import { OutVolumeInfo } from '../OutVolumeInfo';

export const InOutVolumeCard = () => {
    const outInfo = false;

    return (
        <Card>
            <Card.Header>Volumen de Entrada y Salida</Card.Header>
            <Card.Body>
                {outInfo ? (
                    <ListGroup horizontal="xxl">
                        <ListGroup.Item className="col-xxl-6">
                            <InVolumeInfo outInfo={outInfo} />
                        </ListGroup.Item>

                        <ListGroup.Item className="col-xxl-6">
                            <OutVolumeInfo />
                        </ListGroup.Item>
                    </ListGroup>
                ) : (
                    <InVolumeInfo />
                )}
            </Card.Body>
        </Card>
    );
};
