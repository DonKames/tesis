import React, { useEffect } from 'react';
import { getBranchesQty } from '../APIs/branchesAPI';
import { locationsSetBranchesQty } from '../slice/locationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TableBranches } from './TableBranches';
import { Row } from 'react-bootstrap';

export const BranchesSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { branchesQty } = useSelector((state) => state.locations);

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (branchesQty === null) {
                    const branchesQty = await getBranchesQty();
                    console.log('GeneralSection branchesQty: ', branchesQty);
                    dispatch(locationsSetBranchesQty(branchesQty));
                }
            };

            fetchData();
        } catch (error) {
            console.log('error: ', error);
        }
    });

    return (
        <>
            <Row></Row>
            <TableBranches />
        </>
    );
};
