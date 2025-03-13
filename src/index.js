import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Connexion from './Authentification/Connexion';
import Inscription from './Authentification/Inscription';
import Accueil from './Accueil/Accueil';
import Consultation from './CRUD/Consultation';
import AjoutModif from './CRUD/AjoutModif';
import Suppression from './CRUD/Suppression';
import reportWebVitals from './reportWebVitals';
import Messagerie from './Messagerie/Messagerie';
import CGU from './CGU/CGU';
import MentionLegale from './MentionLegale/MentionLegale';
import HealthCheck from './HealthCheck/HealthCheck';
import UserProfile from './Profil/Profil';
import Profil from './Profil/Profil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/ajoutModif" element={<AjoutModif />} />
        <Route path="/suppression" element={<Suppression />} />
        <Route path="/healthcheck" element={<HealthCheck />} />
        <Route path="/messagerie" element={<Messagerie />} />
        <Route path="/healthcheck" element={<HealthCheck />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="./cgu" element={<CGU />} />
        <Route path="./mentionlegale" element={<MentionLegale />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();