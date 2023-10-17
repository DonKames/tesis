import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { SelectSkus } from '../../../shared/ui/components/SelectSkus';
import { useDispatch, useSelector } from 'react-redux';
import { getSkuById, getSkusNames } from '../../products/APIs/skusAPI';
import { uiSetSkusNames } from '../../../shared/ui/slice/uiSlice';

export const SkuSection = () => {
    const dispatch = useDispatch();

    // Redux states
    const { skusNames } = useSelector((state) => state.ui);

    // Local States
    const [selectedSku, setSelectedSku] = useState(null);

    const updateSelectedSku = async (skuId) => {
        const skuData = await getSkuById(skuId);

        console.log(skuData);

        setSelectedSku(skuData);
    };

    const handleSkuChange = async (e) => {
        console.log(e);
        updateSelectedSku(e.target.value);
    };

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (!skusNames.length) {
                    const skusData = await getSkusNames();

                    console.log(skusData);

                    dispatch(uiSetSkusNames(skusData));

                    updateSelectedSku(skusData[0].id);
                } else {
                    updateSelectedSku(skusNames[0].id);
                }
            };

            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Card className="shadow h-100 animate__animated animate__fadeIn animate__fast">
            <Card.Header>
                <Row className="d-flex align-items-center">
                    <Col>
                        <h3 className="mb-0">SKU</h3>
                    </Col>
                    <Col>
                        <SelectSkus
                            name="skuId"
                            handleInputChange={handleSkuChange}
                            skuId={selectedSku?.id}
                        />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                {console.log(selectedSku)}
                <Card.Text>
                    SKU: <strong>{selectedSku?.sku}</strong>
                </Card.Text>
                <Card.Text>
                    Nombre:
                    <strong>{selectedSku?.name}</strong>
                </Card.Text>
                <Card.Text>
                    {/* // !: Recuperar la cantidad de Productos de este sku */}
                    Cantidad Total: <strong>{selectedSku?.name}</strong>{' '}
                </Card.Text>
                <Card.Text>
                    Stock Mínimo: <strong>{selectedSku?.minimumStock}</strong>
                </Card.Text>
                <Card.Text>
                    Estado:{' '}
                    <strong>
                        {selectedSku?.active ? 'Activo' : 'Inactivo'}
                    </strong>
                </Card.Text>
                <Card.Text>
                    Descripción: <strong>{selectedSku?.description}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
