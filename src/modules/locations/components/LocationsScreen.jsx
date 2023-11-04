import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { AddBranchModal } from './AddBranchModal';
import { AddBranchLocationModal } from './AddBranchLocationModal';
import { AddWarehouseModal } from './AddWarehouseModal';
import { BranchesSection } from './BranchesSection';
import { WarehousesSection } from './WarehousesSection';
import { BranchLocationsSection } from './BranchLocationsSection';
import useHasAccess from '../../../shared/hooks/useHasAccess';

export const LocationsScreen = () => {
    const hasAccess = useHasAccess([1, 2]);

    return (
        <Container fluid className="mt-2">
            <Row className="justify-content-center">
                <Row>
                    <Col className="mb-3">
                        {hasAccess && (
                            <Row>
                                <Col xs="12" className="text-end">
                                    <AddBranchModal />
                                </Col>
                            </Row>
                        )}
                        <BranchesSection />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" lg="6">
                        {hasAccess && (
                            <Row>
                                <Col className="text-end">
                                    <AddWarehouseModal />
                                </Col>
                            </Row>
                        )}
                        <WarehousesSection />
                    </Col>
                    <Col xs="12" lg="6">
                        {hasAccess && (
                            <Row>
                                <Col className="text-end">
                                    <AddBranchLocationModal />
                                </Col>
                            </Row>
                        )}
                        <BranchLocationsSection />
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};
