import React from "react";
import "./BookCard.css";

const BookCard = ({ book, handleStartConversation }) => {
    return (
        <div className="book-card">
        {book.chemin_photo && (
            <img src={book.chemin_photo} alt={book.titre_livre} className="book-image" />
        )}
        <div className="book-content">
            <h3 className="book-title">
            {book.titre_livre.length > 50 ? book.titre_livre.slice(0, 50) + "..." : book.titre_livre}
            </h3>
            <p className="book-author">{book.nom} {book.prenom}</p>
            <p className="book-price">{book.prix}€</p>
            <button
            className="message-seller-btn"
            onClick={() => handleStartConversation(book.created_by, book.nom, book.prenom)}
            >
            Contacter le vendeur
            </button>
        </div>
        </div>
    );
};

export default BookCard;
