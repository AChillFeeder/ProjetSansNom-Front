// back/index.js
const express = require("express");
const app = express();
const port = 3001;

// Pour tester : un endpoint simple
app.get("/api", (req, res) => {
  res.json({ message: "Hello depuis le backend !" });
});

// Démarre le serveur
app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});
