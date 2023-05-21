import React, { useEffect, useRef, useState } from 'react';

import Select from 'react-select';
import {
    Button,
    Col,
    Container,
    Form,
    Modal,
    Row,
    Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../../hooks/useForm';
import {
    locationsSetCountries,
    locationsSetRegions,
} from '../slice/locationsSlice';
import { getRegions } from '../APIs/apiRegions';
import { getCountries } from '../APIs/apiCountries';
import { AddWarehouseModal } from './AddWarehouseModal';

export const LocationsScreen = () => {
    const dispatch = useDispatch();

    const [showAddBranchModal, setShowAddBranchModal] = useState(false);
    const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);

    const { countries, regions } = useSelector((state) => state.locations);

    const formRef = useRef(null);

    const handleClose = () => setShowAddBranchModal(false);
    const handleShow = () => setShowAddBranchModal(true);

    useEffect(() => {
        const fetchData = async () => {
            const countries = await getCountries();
            dispatch(locationsSetCountries(countries));

            const regions = await getRegions();
            dispatch(locationsSetRegions(regions));
        };
        fetchData();
    }, []);

    return (
        <Container
            fluid
            className='mt-2'
        >
            <Row className='align-items-center'>
                <Col
                    xs='12'
                    md='6'
                >
                    <Row>
                        <Col>
                            <h1>Sucursales</h1>
                        </Col>
                        <Col className='text-center'>
                            <AddWarehouseModal />
                        </Col>
                    </Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>Haya yay</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Yay</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col
                    xs='12'
                    md='6'
                >
                    <h1>Bodegas</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>bodega</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>bodega</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};
