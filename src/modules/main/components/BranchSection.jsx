import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    getBranchById,
    getBranchesNames,
} from '../../locations/APIs/branchesAPI';
import { uiSetBranchesNames } from '../../../shared/ui/uiSlice';

export const BranchSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { branchesNames } = useSelector((state) => state.ui);
    const { mainBranch } = useSelector((state) => state.settings);

    // Local States
    const [selectedBranch, setSelectedBranch] = useState(null);

    const handleBranchChange = async (e) => {
        // Formatting
        const branchId = +e.target.value;

        const branchData = await getBranchById(branchId);

        setSelectedBranch(branchData);
    };

    // Get branches names and main branch data
    useEffect(() => {
        try {
            const fetchData = async () => {
                if (!branchesNames.length) {
                    const branchesData = await getBranchesNames();
                    dispatch(uiSetBranchesNames(branchesData));
                }

                if (mainBranch) {
                    const branch = await getBranchById(mainBranch.id);
                    console.log(branch);
                    setSelectedBranch(branch);
                }
            };

            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [mainBranch]);

    return (
        <Card className='shadow h-100 animate__animated animate__fadeIn animate__fast'>
            <Card.Header>
                <Row>
                    <Col>
                        <h3>Sucursales</h3>
                    </Col>
                    <Col>
                        <Form.Select
                            value={selectedBranch?.id}
                            onChange={handleBranchChange}
                        >
                            {branchesNames.map((branch) => (
                                <option
                                    key={branch.id}
                                    value={branch.id}
                                >
                                    {branch.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Nombre: <strong>{selectedBranch?.name}</strong>
                </Card.Text>
                <Card.Text>
                    Region: <strong>{selectedBranch?.regionId}</strong>
                </Card.Text>
                <Card.Text>
                    Dirección: <strong>{selectedBranch?.address}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
