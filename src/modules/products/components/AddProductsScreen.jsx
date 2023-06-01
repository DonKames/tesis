import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from '../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../locations/APIs/apiBranches';
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

    const branchOptions = branches.map((branch) => ({
        value: branch.branch_id,
        label: branch.name,
    }));

    const [formProductValues, handleProductInputChange] = useForm({
        fkSku: '',
        epc: '',
    });

    const { epc, fkSku } = formProductValues;

    const handleBranchChange = (selectedOption) => {
        handleProductInputChange({
            target: {
                name: 'branchId',
                value: selectedOption ? selectedOption.value : '',
            },
        });
    };

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
