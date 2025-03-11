import './Inscription.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="auth-container">
          <h2 className="auth-title">Inscription</h2>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="firstname">Prénom</label>
              <input type="text" id="firstname" name="firstname" placeholder="Entrez votre prénom" required />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Nom</label>
              <input type="text" id="lastname" name="lastname" placeholder="Entrez votre nom" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Entrez votre email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" name="password" placeholder="Créez votre mot de passe" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirmez votre mot de passe" required />
            </div>
            <button type="submit" className="login-button">S'inscrire</button>
          </form>
          <p className="signup-text">
            Déjà inscrit ? <a href="/login">Se connecter</a>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;