import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { API_URL } from '../Constante';
import './Suppression.css';

const Suppression = ({ show, handleClose, handleConfirm, livre }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/annonces/${livre.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Erreur lors de la suppression');
            }

            handleConfirm(livre.id);
            handleClose();

        } catch (error) {
            console.error('Delete Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="text-danger">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Confirmer la suppression
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}
                <p>Êtes-vous sûr de vouloir supprimer le livre :</p>
                <p className="fw-bold text-success">{livre?.titre_livre}</p>
                <p className="text-muted small">Cette action est irréversible.</p>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button 
                    variant="outline-secondary" 
                    onClick={handleClose}
                    disabled={loading}
                >
                    <i className="fas fa-times me-2"></i>
                    Annuler
                </Button>
                <Button 
                    variant="danger" 
                    onClick={handleDelete}
                    disabled={loading}
                >
                    <i className="fas fa-trash-alt me-2"></i>
                    {loading ? 'Suppression...' : 'Supprimer'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Suppression;