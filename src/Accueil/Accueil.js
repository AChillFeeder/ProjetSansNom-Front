import React, { useEffect, useState } from 'react';
import './Accueil.css';
import { Link } from 'react-router-dom';
import { API_URL } from '../Constante';

const Accueil = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

        // Pour cet exemple, nous allons simplement diviser les annonces en deux catégories
        const recommended = data.slice(0, 5); // Les 5 premières annonces comme recommandations
        const popular = data.slice(5, 10); // Les 5 suivantes comme populaires

        setRecommendedBooks(recommended);
        setPopularBooks(popular);

      } catch (error) {
        setMessage(`❌ Erreur : ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, []);

  return (
    <div className="home-container">
      <header className="header">
        <div className="left">MIBOOK</div>
        <div className="center">
          <input type="text" placeholder="Rechercher..." className="search-bar" />
          <button className="search-button">
            🔍
          </button>
        </div>
        <div className="right">
          <Link to="../Messagerie">
            <button className="message-button">Messagerie</button>
          </Link>
          <Link to="../Profil">
            <button className="profile-button">Profil</button>
          </Link>
        </div>
      </header>
      <main className="main-content">
        {message && (
          <div className={`alert ${message.includes('❌') ? 'alert-danger' : 'alert-success'} mb-4`}>
            {message}
          </div>
        )}
        <section className="recommendations">
          <h2>Recommandations pour vous</h2>
          <div className="book-list">
            {recommendedBooks.map(book => (
              <div key={book.id} className="book-card">
                <img src={book.chemin_photo} alt={book.titre_livre} className="book-image" />
                <h3 className="book-title">{book.titre_livre}</h3>
                <p className="book-author">{book.nom} {book.prenom}</p>
                <p className="book-price">{book.prix}€</p>
              </div>
            ))}
          </div>
        </section>
        <section className="popular-books">
          <h2>Livres populaires</h2>
          <div className="book-list">
            {popularBooks.map(book => (
              <div key={book.id} className="book-card">
                <img src={book.chemin_photo} alt={book.titre_livre} className="book-image" />
                <h3 className="book-title">{book.titre_livre}</h3>
                <p className="book-author">{book.nom} {book.prenom}</p>
                <p className="book-price">{book.prix}€</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="useful-links">
          <a href="/cgu">CGU</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="social-legal">
          <span>Réseaux sociaux</span>
          <a href="/mentionlegale">Mentions légales</a>
        </div>
      </footer>
    </div>
  );
};

export default Accueil;