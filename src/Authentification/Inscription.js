import React, { useState } from "react";
import "./Inscription.css";
import { API_URL } from '../Constante';

function Inscription() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        type_compte: "user"
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage("⚠️ Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nom: formData.lastname,
                    prenom: formData.firstname,
                    email: formData.email,
                    password: formData.password,
                    type_compte: formData.type_compte
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Une erreur inconnue est survenue.");
            }

            setMessage("✅ Inscription réussie ! Redirection...");
            setTimeout(() => {
                window.location.href = "/connexion";
            }, 2000);
        } catch (error) {
            setMessage(`❌ Erreur : ${error.message}`);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className="auth-container">
                    <h2 className="auth-title">Inscription</h2>
                    {message && <p className="message">{message}</p>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstname">Prénom</label>
                            <input type="text" id="firstname" name="firstname" placeholder="Entrez votre prénom" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Nom</label>
                            <input type="text" id="lastname" name="lastname" placeholder="Entrez votre nom" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Entrez votre email" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" id="password" name="password" placeholder="Créez votre mot de passe" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirmez votre mot de passe" required onChange={handleChange} />
                        </div>
                        <button type="submit" className="login-button">S'inscrire</button>
                    </form>
                    <p className="signup-text">
                        Déjà inscrit ? <a href="/connexion">Se connecter</a>
                    </p>
                </div>
            </header>
        </div>
    );
}

export default Inscription;
