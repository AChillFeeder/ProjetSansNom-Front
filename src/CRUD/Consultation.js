import React, { useState } from 'react';
import { Table, Badge, Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Consultation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Suppression from './Suppression';
import AjoutModif from './AjoutModif';

const Consultation = () => {
    // État pour gérer les modales
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAjoutModifModal, setShowAjoutModifModal] = useState(false);
    const [selectedLivre, setSelectedLivre] = useState(null);
    const [mode, setMode] = useState('ajout');

    const livres = [
        {
            id: 1,
            titre_livre: "Harry Potter à l'école des sorciers",
            titre_annonce: "Harry Potter tome 1 en excellent état",
            etat_livre_id: "Très bon état",
            created_at: "2024-03-11",
            nombre_de_vues: 150,
            archive: false,
            prix: "15.99€"
        },
        // ... autres livres existants ...
    ];

    const handleAdd = () => {
        setMode('ajout');
        setSelectedLivre(null);
        setShowAjoutModifModal(true);
    };

    const handleEdit = (livre) => {
        setMode('modification');
        setSelectedLivre(livre);
        setShowAjoutModifModal(true);
    };

    const handleCloseAjoutModif = () => {
        setShowAjoutModifModal(false);
        setSelectedLivre(null);
        setMode('ajout');
    };

    const handleDelete = (livre) => {
        setSelectedLivre(livre);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        console.log("Suppression confirmée du livre:", selectedLivre);
        // Ajoutez ici la logique de suppression
        setShowDeleteModal(false);
        setSelectedLivre(null);
    };

    return (
        <Container fluid className="consultation-container py-5">
            <Row className="mb-4">
                <Col>
                    <Button className="add-button mb-4" onClick={handleAdd}>
                        <i className="fas fa-plus"></i> Ajouter un livre
                    </Button>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4">Catalogue des Livres</h2>
                            <Table striped bordered hover responsive className="custom-table">
                                <thead className="table-header">
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th>Titre du livre</th>
                                        <th>Annonce</th>
                                        <th className="text-center">État</th>
                                        <th className="text-center">Date</th>
                                        <th className="text-center">Vues</th>
                                        <th className="text-center">Prix</th>
                                        <th className="text-center">Statut</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {livres.map((livre) => (
                                        <tr key={livre.id} className="table-row-hover">
                                            <td className="text-center">{livre.id}</td>
                                            <td className="fw-bold">{livre.titre_livre}</td>
                                            <td>{livre.titre_annonce}</td>
                                            <td className="text-center">
                                                <Badge bg="info" className="etat-badge">
                                                    {livre.etat_livre_id}
                                                </Badge>
                                            </td>
                                            <td className="text-center">{livre.created_at}</td>
                                            <td className="text-center">{livre.nombre_de_vues}</td>
                                            <td className="text-center fw-bold">{livre.prix}</td>
                                            <td className="text-center">
                                                <Badge 
                                                    bg={livre.archive ? "secondary" : "success"}
                                                    className="status-badge"
                                                >
                                                    {livre.archive ? "Archivé" : "Disponible"}
                                                </Badge>
                                            </td>
                                            <td className="text-center">
                                                <div className="action-buttons">
                                                    <Button 
                                                        className="btn-edit"
                                                        onClick={() => handleEdit(livre)}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                    <Button 
                                                        className="btn-delete"
                                                        onClick={() => handleDelete(livre)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Modales */}
            {showAjoutModifModal && (
                <AjoutModif 
                    show={showAjoutModifModal}
                    handleClose={handleCloseAjoutModif}
                    mode={mode}
                    livre={selectedLivre}
                />
            )}

            {showDeleteModal && (
                <Suppression 
                    show={showDeleteModal}
                    handleClose={() => setShowDeleteModal(false)}
                    handleConfirm={handleConfirmDelete}
                    livre={selectedLivre}
                />
            )}
        </Container>
    );
};

export default Consultation;