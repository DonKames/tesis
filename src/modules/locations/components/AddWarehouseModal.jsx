import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export const AddWarehouseModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    return (
        <>
            <Button
                variant='primary'
                onClick={handleOpenModal}
            >
                Agregar Bodega
            </Button>
            <Modal
                show={showModal}
                onHide={handleCloseModal}
            >
                <Modal.Header>
                    <Modal.Title>Agregar Bodega</Modal.Title>
                </Modal.Header>
            </Modal>
        </>
    );
};
