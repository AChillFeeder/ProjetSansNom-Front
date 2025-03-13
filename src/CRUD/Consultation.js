import React, { useState, useEffect } from 'react';
import { Table, Badge, Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import './Consultation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Suppression from './Suppression';
import AjoutModif from './AjoutModif';
import { API_URL } from '../Constante';

const Consultation = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAjoutModifModal, setShowAjoutModifModal] = useState(false);
    const [selectedLivre, setSelectedLivre] = useState(null);
    const [mode, setMode] = useState('ajout');
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [livres, setLivres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(livres.length / itemsPerPage);

    // Obtenir les livres de la page courante
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = livres.slice(indexOfFirstItem, indexOfLastItem);

    // Changer de page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Composant de pagination
    const renderPagination = () => {
        let items = [];
        const maxPagesToShow = 5;
        const halfMaxPages = Math.floor(maxPagesToShow / 2);
        
        let startPage = Math.max(currentPage - halfMaxPages, 1);
        let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(endPage - maxPagesToShow + 1, 1);
        }

        // Ajout de la première page et des points de suspension si nécessaire
        if (startPage > 1) {
            items.push(
                <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
                    1
                </Pagination.Item>
            );
            if (startPage > 2) {
                items.push(<Pagination.Ellipsis key="ellipsis1" disabled />);
            }
        }

        // Ajout des pages dans la plage calculée
        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }

        // Ajout de la dernière page et des points de suspension si nécessaire
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(<Pagination.Ellipsis key="ellipsis2" disabled />);
            }
            items.push(
                <Pagination.Item 
                    key={totalPages} 
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        return (
            <Pagination className="justify-content-center mt-4">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {items}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
        );
    };

    // Modifier handleAdd pour qu'il ouvre simplement la modale
    const handleAdd = () => {
        setMode('ajout');
        setSelectedLivre(null);
        setShowAjoutModifModal(true);
    };

    // Ajouter la fonction qui gère la soumission du formulaire
    const handleSubmitAjoutModif = async (formData) => {
        setLoading(true);
        console.group('AjoutModif API Call');
        try {
            console.log('%c📤 Request Details', 'color: #2196F3; font-weight: bold;');
            console.table({
                url: `${API_URL}/api/annonces`,
                method: mode === 'ajout' ? "POST" : "PUT",
                mode: mode
            });
            
            console.log('%c📦 Form Data', 'color: #4CAF50; font-weight: bold;');
            console.table(formData);

            const response = await fetch(`${API_URL}/api/annonces`, {
                method: mode === 'ajout' ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('%c🔍 Response Data', 'color: #FF9800; font-weight: bold;');
            console.table(data);

            if (!response.ok) {
                throw new Error(data.message || "Une erreur est survenue lors de l'opération.");
            }

            // Update the table with the new data
            if (mode === 'ajout') {
                setLivres(prevLivres => [...prevLivres, data]);
            } else {
                setLivres(prevLivres => 
                    prevLivres.map(livre => 
                        livre.id === selectedLivre.id ? data : livre
                    )
                );
            }

            setMessage(`✅ Livre ${mode === 'ajout' ? 'ajouté' : 'modifié'} avec succès !`);
            setShowAjoutModifModal(false);

        } catch (error) {
            console.error('%c❌ Error Details', 'color: #f44336; font-weight: bold;');
            console.error('Message:', error.message);
            console.error('Stack:', error.stack);
            setMessage(`❌ Erreur : ${error.message}`);
        } finally {
            console.log('%c✨ Request Completed', 'color: #795548; font-weight: bold;');
            console.groupEnd();
            setLoading(false);
        }
    };

    // Ajouter cette nouvelle fonction pour récupérer les annonces
    const fetchAnnonces = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/annonces`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de la récupération des annonces.");
            }

            setLivres(data); // Assurez-vous d'ajouter le state : const [livres, setLivres] = useState([]);

        } catch (error) {
            setMessage(`❌ Erreur : ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Ajouter useEffect pour charger les annonces au montage du composant
    useEffect(() => {
        fetchAnnonces();
    }, []);

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
            {message && (
                <div className={`alert ${message.includes('❌') ? 'alert-danger' : 'alert-success'} mb-4`}>
                    {message}
                </div>
            )}
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
                                    {currentItems.map((livre) => (
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

            {/* Ajouter la pagination après le tableau */}
            {renderPagination()}

            {/* Modales */}
            {showAjoutModifModal && (
                <AjoutModif 
                    show={showAjoutModifModal}
                    handleClose={handleCloseAjoutModif}
                    mode={mode}
                    livre={selectedLivre}
                    onSubmit={handleSubmitAjoutModif}
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