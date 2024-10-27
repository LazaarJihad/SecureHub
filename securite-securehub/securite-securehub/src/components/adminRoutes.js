const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // Assurez-vous que le chemin est correct

// Route pour obtenir les informations de l'administrateur
router.get('/admin-info', async (req, res) => {
  try {
    // Remplacez cette ligne avec une méthode appropriée pour obtenir l'utilisateur actuel
    const username = req.query.username || req.body.username;
    const adminInfo = await Admin.findOne({ username });
    res.json(adminInfo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching admin info' });
  }
});

// Route pour mettre à jour les informations de l'administrateur
router.put('/admin-info', async (req, res) => {
  try {
    const { username, email } = req.body;
    // Remplacez cette ligne avec une méthode appropriée pour obtenir l'utilisateur actuel
    const currentUsername = req.query.username || req.body.currentUsername;
    const updatedAdmin = await Admin.findOneAndUpdate(
      { username: currentUsername },
      { username, email },
      { new: true }
    );
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating admin info' });
  }
});

// Route pour ajouter un nouvel administrateur
router.post('/admin-info', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newAdmin = new Admin({ username, email, password });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding admin' });
  }
});

module.exports = router;
