import "./Accueil.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../Constante";
import BookCard from "../components/BookCard";
import React, { useEffect, useState } from "react";

const Accueil = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [filteredRecommended, setFilteredRecommended] = useState([]);
  const [filteredPopular, setFilteredPopular] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/annonces`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(data.message || "Erreur lors de la récupération des annonces.");
        }

        setRecommendedBooks(data.slice(0, 5));
        setPopularBooks(data.slice(5, 10));
        setFilteredRecommended(data.slice(0, 5));
        setFilteredPopular(data.slice(5, 10));
      } catch (error) {
        setMessage(`❌ Erreur : ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, []);

  // Met à jour les livres affichés en fonction de la recherche
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRecommended(recommendedBooks);
      setFilteredPopular(popularBooks);
    } else {
      setFilteredRecommended(
        recommendedBooks.filter((book) =>
          book.titre_livre.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredPopular(
        popularBooks.filter((book) =>
          book.titre_livre.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, recommendedBooks, popularBooks]);

  const handleStartConversation = async (sellerId, sellerName, sellerPrenom) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setMessage("❌ Vous devez être connecté pour envoyer un message.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/messages/start-conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          id_sender: userId,
          id_receiver: sellerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Impossible de créer la conversation.");
      }

      navigate(`/messagerie?partnerId=${sellerId}&name=${sellerPrenom} ${sellerName}`);
    } catch (error) {
      setMessage(`❌ Erreur : ${error.message}`);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="left"><span className="bold_title_part">ME</span>|BOOK</div>
        <div className="left">
          <span className="bold_title_part">ME</span>|BOOK
        </div>
        <div className="center">
          <input
            type="text"
            placeholder="Rechercher..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">🔍</button>
        </div>
        <div className="right">
        <Link to="/consultation">
            <button className="annonces-button">Toutes les annonces</button>
          </Link>
          <Link to="/messagerie">
            <button className="message-button">Messagerie</button>
          </Link>
          <Link to="/profil">
            <button className="profile-button">Profil</button>
          </Link>
        </div>
      </header>

      <main className="main-content">
        {message && <div className="alert alert-danger mb-4">{message}</div>}

        <section className="recommendations">
          <h2>📚 Recommandations pour vous</h2>
          <div className="book-list">
            {recommendedBooks.map(book => (
              <BookCard key={book.id} book={book} handleStartConversation={handleStartConversation} />
            ))}
            {filteredRecommended.length > 0 ? (
              filteredRecommended.map((book) => (
                <div key={book.id} className="book-card">
                  <h3 className="book-title">{book.titre_livre.slice(0, 100)}...</h3>
                  <p className="book-author">{book.nom} {book.prenom}</p>
                  <p className="book-price">{book.prix}€</p>
                  <button
                    className="message-seller-btn"
                    onClick={() => handleStartConversation(book.created_by, book.nom, book.prenom)}
                  >
                    Envoyer un message au vendeur
                  </button>
                </div>
              ))
            ) : (
              <p>Aucun livre trouvé.</p>
            )}
          </div>
        </section>

        <section className="popular-books">
          <h2>🔥 Livres populaires</h2>
          <div className="book-list">
            {popularBooks.map(book => (
              <BookCard key={book.id} book={book} handleStartConversation={handleStartConversation} />
            ))}
            {filteredPopular.length > 0 ? (
              filteredPopular.map((book) => (
                <div key={book.id} className="book-card">
                  <img src={book.chemin_photo} alt={book.titre_livre} className="book-image" />
                  <h3 className="book-title">
                    {book.titre_livre.length > 100 ? book.titre_livre.slice(0, 100) + "..." : book.titre_livre}
                  </h3>
                  <p className="book-author">{book.nom} {book.prenom}</p>
                  <p className="book-price">{book.prix}€</p>
                  <button
                    className="message-seller-btn"
                    onClick={() => handleStartConversation(book.created_by, book.nom, book.prenom)}
                  >
                    Envoyer un message au vendeur
                  </button>
                </div>
              ))
            ) : (
              <p>Aucun livre trouvé.</p>
            )}
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

export default Accueil;
