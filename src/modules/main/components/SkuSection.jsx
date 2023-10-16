import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { SelectSkus } from '../../../shared/ui/components/SelectSkus';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export const SkuSection = () => {
    const dispatch = useDispatch();

    // Local States
    const [selectedSku, setSelectedSku] = useState(null);

    const updateSelectedSku = async (skuId) => {
        const skuData = await getSkuById(skuId);

        setSelectedSku(skuData);
    };

    const handleSkuChange = async (e) => {
        // console.log(e);
        updateSelectedSku(e.target.value);
    }

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (mainBranch) {
                    updateSelectedSku(mainBranch.id);
                }
            };

            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [mainBranch]);


    return (
        <Card className="shadow h-100 animate__animated animate__fadeIn animate__fast">
            <Card.Header>
                <Row>
                    <Col>
                        <h3>SKU</h3>
                    </Col>
                    <Col>
                        <SelectSkus
                            name="skuId"
                            handleInputChange={() => {}}
                            skuId={1}
                        />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>SKU: {selectedSku?.sku}</Card.Text>
                <Card.Text>Nombre: {selectedSku?.}</Card.Text>
                <Card.Text>Cantidad Total: {selectedSku?.}</Card.Text>
                <Card.Text>Stock Mínimo: {selectedSku?.}</Card.Text>
                <Card.Text>Estado: {selectedSku?.}</Card.Text>
                <Card.Text>Descripción: {selectedSku?.}</Card.Text>
            </Card.Body>
        </Card>
    );
};
