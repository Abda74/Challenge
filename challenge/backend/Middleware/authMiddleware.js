const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const dotenv = require('dotenv');

dotenv.config();

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization;

    console.log('Authorization Header:', token);

    if (token && token.startsWith('Bearer ')) {
        try {
            token = token.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            console.log('Decoded User:', req.user); // Vérification

            if (!req.user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }

            next();
        } catch (error) {
            console.error('JWT Error:', error); // Afficher l'erreur complète
            res.status(401).json({ message: 'Token invalide' });
        }
    } else {
        res.status(401).json({ message: 'Non autorisé, aucun token' });
    }
};
