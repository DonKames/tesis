import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { ProductSearcher } from '../../../shared/ui/components/ProductSearcher';
import { getProductById } from '../../products/APIs/productsAPI';

export const ProductSection = () => {
    // Local States
    const [selectedProduct, setSelectedProduct] = useState(null);

    const updateSelectedProducts = async (productId) => {
        const productData = await getProductById(productId);

        console.log(productData);

        setSelectedProduct(productData);
    };

    const handleProductChange = (e) => {
        updateSelectedProducts(e.target.value);
    };

    return (
        <Card className="shadow h-100 animate__animated animate__fadeIn animate__fast">
            <Card.Header>
                <Row className="d-flex align-items-center">
                    <Col>
                        <h3 className="mb-0">Productos</h3>
                    </Col>
                    <Col>
                        <ProductSearcher
                            name="productId"
                            handleInputChange={handleProductChange}
                            productId={selectedProduct?.id}
                        />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    EPC: <strong>{selectedProduct?.epc}</strong>{' '}
                </Card.Text>
                <Card.Text>
                    Sku: <strong>{selectedProduct?.sku}</strong>{' '}
                </Card.Text>
                <Card.Text>
                    Sucursal: <strong>{selectedProduct?.branchName}</strong>{' '}
                </Card.Text>
                <Card.Text>
                    Bodega: <strong>{selectedProduct?.warehouseName}</strong>{' '}
                </Card.Text>
                <Card.Text>
                    Estado:{' '}
                    <strong>
                        {selectedProduct?.active ? 'Activo' : 'Inactivo'}
                    </strong>{' '}
                </Card.Text>
                <Card.Text></Card.Text>
            </Card.Body>
        </Card>
    );
};
