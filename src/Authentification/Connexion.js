import { useState } from "react";
import "./Connexion.css";
import Inscription from "./Inscription";
import { API_URL } from "../Constante";

function Connexion() {
const [showInscription, setShowInscription] = useState(false);
const [formData, setFormData] = useState({ email: "", password: "" });
const [message, setMessage] = useState("");

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
    const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Une erreur inconnue est survenue.");
    }

    setMessage("✅ Connexion réussie ! Redirection...");
    
    if (data.userId) {
        localStorage.setItem("userId", data.userId);
    }
    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    setTimeout(() => {
        window.location.href = "/";
    }, 2000);
    } catch (error) {
    setMessage(`❌ Erreur : ${error.message}`);
    }
};

if (showInscription) {
    return <Inscription />;
}

return (
    <div className="App">
    <header className="App-header">
        <div className="auth-container">
        <h2 className="auth-title">Connexion</h2>
        {message && <p className="message">{message}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Entrez votre email"
                required
                value={formData.email} // ✅ Controlled input
                onChange={handleChange}
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                required
                value={formData.password} // ✅ Controlled input
                onChange={handleChange}
            />
            </div>
            <button type="submit" className="login-button">
            Se connecter
            </button>
        </form>
        <p className="signup-text">
            Vous n'avez pas de compte ?{" "}
            <span
            onClick={() => setShowInscription(true)}
            style={{ cursor: "pointer", color: "#FFD700" }}
            >
            S'inscrire
            </span>
        </p>
        </div>
    </header>
    </div>
);
}

export default Connexion;
