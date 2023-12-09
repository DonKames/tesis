import React, { useEffect } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getBranches } from '../../locations/APIs/branchesAPI';
import {
    locationsSetBranches,
    locationsSetBranchesQty,
} from '../../locations/slice/locationsSlice';
import { AddSkuForm } from './AddSkuForm';
import { AddProductForm } from './AddProductForm';

export const AddProductsScreen = () => {
    const dispatch = useDispatch();

    const { branches } = useSelector((state) => state.locations);

    useEffect(() => {
        const fetchData = async () => {
            if (!branches.length) {
                // !Corregir
                const { data } = await getBranches();
                dispatch(locationsSetBranches(data.data));
                dispatch(locationsSetBranchesQty(data.qty));
            }
        };
        fetchData();
    }, [getBranches, dispatch]);

    return (
        <Container>
            <Row className="text-center">
                <Col className="h1">Agregar SKU / Productos</Col>
            </Row>
            <Row>
                <Col>
                    <AddSkuForm />
                </Col>
                <Col>
                    <AddProductForm />
                </Col>
            </Row>
        </Container>
    );
};
