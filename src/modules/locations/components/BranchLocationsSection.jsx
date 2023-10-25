import React from 'react';
import { Row } from 'react-bootstrap';
import { TableBranchLocations } from './TableBranchLocations';

export const BranchLocationsSection = () => {
    return (
        <>
            <Row></Row>
            <TableBranchLocations className="h-100" />
        </>
    );
};
