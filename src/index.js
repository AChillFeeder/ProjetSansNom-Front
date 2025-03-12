import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Connexion from './Authentification/Connexion';
import Inscription from './Authentification/Inscription';
import Consultation from './CRUD/Consultation';
import AjoutModif from './CRUD/AjoutModif';
import Suppression from './CRUD/Suppression';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/ajoutModif" element={<AjoutModif />} />
        <Route path="/suppression" element={<Suppression />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();