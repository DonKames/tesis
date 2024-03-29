import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    getBranchById,
    getBranchesNames,
} from '../../locations/APIs/branchesAPI';
import { uiSetBranchesNames } from '../../../shared/ui/slice/uiSlice';
import { SelectBranches } from '../../../shared/ui/components/SelectBranches';
import { getWarehousesQty } from '../../locations/APIs/warehouseAPI';

export const BranchSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { branchesNames } = useSelector((state) => state.ui);
    const { mainBranch } = useSelector((state) => state.settings);

    // Local States
    const [selectedBranch, setSelectedBranch] = useState(null);

    const handleBranchChange = async (e) => {
        updateSelectedBranch(e.target.value);
    };

    const updateSelectedBranch = async (branchId) => {
        const { data: branchData } = await getBranchById(branchId);

        // console.log('branchData', branchData);

        const { data: warehousesQty } = await getWarehousesQty({
            branchId,
        });

        const branchDataWithWarehousesQty = {
            ...branchData.data,
            warehousesQty,
        };

        setSelectedBranch(branchDataWithWarehousesQty);
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
                    updateSelectedBranch(mainBranch.id);
                }
            };

            fetchData();
        } catch (error) {}
    }, [mainBranch]);

    // console.log(selectedBranch);
    return (
        <Card className="shadow h-100 animate__animated animate__fadeIn animate__fast">
            {console.log('selectedBranch: ', selectedBranch)}
            <Card.Header>
                <Row>
                    <Col className="d-flex align-items-center col-auto">
                        <h3 className="mb-0">Sucursales</h3>
                    </Col>
                    <Col>
                        <SelectBranches
                            handleInputChange={handleBranchChange}
                            name="mainBranch"
                            branchId={mainBranch?.id}
                        />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Nombre: <strong>{selectedBranch?.name}</strong>
                </Card.Text>
                <Card.Text>
                    Comuna: <strong>{selectedBranch?.municipalityName}</strong>
                </Card.Text>
                <Card.Text>
                    Dirección: <strong>{selectedBranch?.address}</strong>
                </Card.Text>
                <Card.Text>
                    Cantidad de Bodegas:{' '}
                    <strong>{selectedBranch?.warehousesQty || 0}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
