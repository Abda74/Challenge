const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

// Enregistrement d'un utilisateur
const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur ou l'email existe déjà
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Nom d\'utilisateur ou email déjà pris' });
        }

        // Créer un nouvel utilisateur
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Générer un token JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Utilisateur créé avec succès', token });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Erreur de validation', error: error.message });
        }
        console.error('Erreur serveur lors de l\'inscription:', error);
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};

// Connexion d'un utilisateur
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Trouver l'utilisateur par son nom d'utilisateur
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        // Comparer les mots de passe
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie', token });
    } catch (error) {
        console.error('Erreur serveur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};

module.exports = { register, login };