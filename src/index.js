import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Connexion from './Authentification/Connexion';
import Inscription from './Authentification/Inscription';
import reportWebVitals from './reportWebVitals';

import HealthCheck from './HealthCheck/HealthCheck';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/healthcheck" element={<HealthCheck />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();