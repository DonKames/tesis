import React, { useEffect } from 'react';
import { getBranchesQty } from '../APIs/branchesAPI';
import { locationsSetBranchesQty } from '../slice/locationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TableBranches } from './TableBranches';
import { Row } from 'react-bootstrap';

export const BranchesSection = () => {
    return (
        <>
            <Row></Row>
            <TableBranches />
        </>
    );
};
