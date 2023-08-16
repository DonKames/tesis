import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card } from 'react-bootstrap';
import {
    faWarehouse,
    faBuilding,
    faTent,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

export const GeneralSection = () => {
    // Redux states
    const { branchesQty, warehousesQty, branchLocationsQty } = useSelector(
        (state) => state.locations,
    );
    return (
        <>
            <Card className='shadow'>
                <Card.Header>
                    <h3>Resumen General</h3>
                </Card.Header>
                <Card.Body>
                    <Card.Text className='my-2'>
                        <FontAwesomeIcon icon={faBuilding} /> Cantidad total de
                        Sucursales:
                        <strong> {branchesQty}</strong>
                    </Card.Text>
                    <Card.Text className='my-2'>
                        <FontAwesomeIcon icon={faWarehouse} /> Cantidad total de
                        Bodegas: <strong>{warehousesQty}</strong>
                    </Card.Text>
                    <Card.Text className='my-2'>
                        <FontAwesomeIcon icon={faTent} /> Cantidad total de
                        Ubicaciones de Sucursal:{' '}
                        <strong>{branchLocationsQty}</strong>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};
