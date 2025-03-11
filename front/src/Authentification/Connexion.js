import { useState } from 'react';
import './Connexion.css';
import Inscription from './Inscription';

function App() {
  const [showInscription, setShowInscription] = useState(false);

  if (showInscription) {
    return <Inscription />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="auth-container">
          <h2 className="auth-title">Connexion</h2>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Entrez votre email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" name="password" placeholder="Entrez votre mot de passe" required />
            </div>
            <button type="submit" className="login-button">Se connecter</button>
          </form>
          <p className="signup-text">
            Vous n'avez pas de compte ? <span onClick={() => setShowInscription(true)} style={{ cursor: 'pointer', color: '#FFD700' }}>S'inscrire</span>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;