const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');

// Enregistrement d'un utilisateur
const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur ou l'email existe déjà
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Nom d\'utilisateur ou email déjà pris' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur avec le mot de passe haché
        const newUser = new User({ username, email, password: hashedPassword });
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


//login
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Vérifier si les données sont présentes
        if (!username || !password) {
            return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis' });
        }

        // Trouver l'utilisateur par username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        // Vérifier si le mot de passe est correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Envoyer la réponse avec le token
        res.json({ message: 'Connexion réussie', token });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};


module.exports = { register, login };