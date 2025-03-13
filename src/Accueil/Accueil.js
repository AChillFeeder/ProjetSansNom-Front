import React, { useEffect, useState } from 'react';
import './Accueil.css';

const Accueil = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://api.example.com/recommended-books');
        const data = await response.json();
        setRecommendedBooks(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres recommandés:', error);
      }
    };

    const fetchPopularBooks = async () => {
      try {
        const response = await fetch('https://api.example.com/popular-books');
        const data = await response.json();
        setPopularBooks(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres populaires:', error);
      }
    };

    fetchBooks();
    fetchPopularBooks();
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
          <button
            className="message-button"
            onClick={() => (window.location.href = "/mesagerie")}>
            Messagerie
          </button>
          <button className="profile-button"
            onClick={() => (window.location.href = "/profil")}>
            Profil
          </button>
        </div>
      </header>
      <main className="main-content">
        <section className="recommendations">
          <h2>Recommandations pour vous</h2>
          <div className="book-list">
            {recommendedBooks.map(book => (
              <div key={book.id} className="book-card">
                <img src={book.image} alt={book.title} className="book-image" />
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <p className="book-price">{book.price}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="popular-books">
          <h2>Livres populaires</h2>
          <div className="book-list">
            {popularBooks.map(book => (
              <div key={book.id} className="book-card">
                <img src={book.image} alt={book.title} className="book-image" />
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <p className="book-price">{book.price}</p>
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
          <span>Mentions légales</span>
        </div>
      </footer>
    </div>
  );
};

export default Accueil;