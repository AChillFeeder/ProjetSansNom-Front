import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import './AjoutModif.css';

const AjoutModif = ({ show, handleClose, mode, livre, onSubmit }) => {
    const [formData, setFormData] = useState({
        titre_livre: '',
        titre_annonce: '',
        description_annonce: '',
        etat_livre_id: '',
        prix: '',
        photos: []
    });

    useEffect(() => {
        if (livre && mode === 'modification') {
            setFormData({
                titre_livre: livre.titre_livre || '',
                titre_annonce: livre.titre_annonce || '',
                description_annonce: livre.description_annonce || '',
                etat_livre_id: livre.etat_livre_id || '',
                prix: livre.prix || '',
                photos: []
            });
        }
    }, [livre, mode]);

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        
        // Create a clean object without any circular references
        const cleanData = {
            titre_livre: formData.titre_livre.trim(),
            titre_annonce: formData.titre_annonce.trim(),
            description_annonce: formData.description_annonce.trim(),
            etat_livre_id: parseInt(formData.etat_livre_id) || 0,
            prix: parseFloat(formData.prix) || 0
        };
        
        onSubmit(cleanData);
        handleClose();
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        if (type === 'file') {
            const files = Array.from(e.target.files);
            setFormData(prev => ({
                ...prev,
                photos: files
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">{mode === 'ajout' ? 'Ajouter un livre' : 'Modifier le livre'}</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Titre du livre*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="titre_livre"
                                        value={formData.titre_livre || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Titre de l'annonce*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="titre_annonce"
                                        value={formData.titre_annonce || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Description de l'annonce*</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="description_annonce"
                                        value={formData.description_annonce || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>État du livre*</Form.Label>
                                    <Form.Select 
                                        name="etat_livre_id" 
                                        value={formData.etat_livre_id || ''}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Sélectionnez un état</option>
                                        <option value="1">Neuf</option>
                                        <option value="2">Très bon état</option>
                                        <option value="3">Bon état</option>
                                        <option value="4">État correct</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Prix*</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.01"
                                        name="prix"
                                        value={formData.prix || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Photos</Form.Label>
                                    <Form.Control
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        name="photos"
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button type="submit" className="btn-success">
                                        {mode === 'ajout' ? 'Ajouter' : 'Modifier'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="text-success">
                        <i className="fas fa-book me-2"></i>
                        {mode === 'ajout' ? 'Ajouter un livre' : 'Modifier le livre'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Titre du livre*</Form.Label>
                            <Form.Control
                                type="text"
                                name="titre_livre"
                                value={formData.titre_livre || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Titre de l'annonce*</Form.Label>
                            <Form.Control
                                type="text"
                                name="titre_annonce"
                                value={formData.titre_annonce || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description de l'annonce*</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="description_annonce"
                                value={formData.description_annonce || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>État du livre*</Form.Label>
                            <Form.Select 
                                name="etat_livre_id" 
                                value={formData.etat_livre_id || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionnez un état</option>
                                <option value="1">Neuf</option>
                                <option value="2">Très bon état</option>
                                <option value="3">Bon état</option>
                                <option value="4">État correct</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Prix*</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="prix"
                                value={formData.prix || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Photos</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                accept="image/*"
                                name="photos"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="outline-secondary" onClick={handleClose}>
                        <i className="fas fa-times me-2"></i>
                        Annuler
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        <i className="fas fa-check me-2"></i>
                        {mode === 'ajout' ? 'Ajouter' : 'Modifier'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AjoutModif;