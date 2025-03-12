import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Connexion from './Authentification/Connexion';
import Inscription from './Authentification/Inscription';
import reportWebVitals from './reportWebVitals';
import Messagerie from './Messagerie/Messagerie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/messagerie" element={<Messagerie />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();