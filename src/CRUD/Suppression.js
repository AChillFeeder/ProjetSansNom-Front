import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Suppression.css';

const Suppression = ({ show, handleClose, handleConfirm, livre }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="text-danger">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Confirmer la suppression
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Êtes-vous sûr de vouloir supprimer le livre :</p>
                <p className="fw-bold text-success">{livre?.titre_livre}</p>
                <p className="text-muted small">Cette action est irréversible.</p>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="outline-secondary" onClick={handleClose}>
                    <i className="fas fa-times me-2"></i>
                    Annuler
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    <i className="fas fa-trash-alt me-2"></i>
                    Supprimer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Suppression;