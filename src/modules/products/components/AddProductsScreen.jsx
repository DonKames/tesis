import React, { useEffect } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getBranches } from '../../locations/APIs/branchesAPI';
import { locationsSetBranches } from '../../locations/slice/locationsSlice';
import { AddSkuForm } from './addSkuForm';
import { AddProductForm } from './AddProductForm';

export const AddProductsScreen = () => {
    const dispatch = useDispatch();

    const { branches } = useSelector((state) => state.locations);

    useEffect(() => {
        const fetchData = async () => {
            if (!branches.length) {
                const branches = await getBranches();
                dispatch(locationsSetBranches(branches));
            }
        };
        fetchData();
    }, [getBranches, dispatch]);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Agregar Productos</h1>
                    <AddSkuForm />
                </Col>
                <Col>
                    <h1>Agregar Productos</h1>
                    <AddProductForm />
                </Col>
            </Row>
        </Container>
    );
};
