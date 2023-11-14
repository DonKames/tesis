import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { InventoryOverview } from '../InventoryOverview';
import { RecentlyAddedItems } from '../RecentlyAddedItems';
import { LowStockAlerts } from '../LowStockAlerts';

export const InventoryCard = () => {
    // {
    // inventoryOverview,
    // recentItems,
    // lowStockItems,
    // }

    return (
        <Card>
            <Card.Header as="h5">Gestión de Inventario</Card.Header>
            <ListGroup variant="flush">
                {/* Sección de Vista General */}
                <InventoryOverview />

                {/* Sección de Ítems Recientemente Añadidos */}
                <RecentlyAddedItems />

                {/* Sección de Alertas de Stock Bajo */}
                <LowStockAlerts />
            </ListGroup>
            <Card.Footer>
                <Button variant="primary">Ver Detalles</Button>
            </Card.Footer>
        </Card>
    );
};
