const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes'); // Assurez-vous que le chemin est correct

const app = express();
app.use(bodyParser.json());

// Utiliser les routes d'administration
app.use('/api', adminRoutes);

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost/securehub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Démarrer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
