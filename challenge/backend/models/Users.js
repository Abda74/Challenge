const mongoose = require('mongoose');

// Schéma de l'utilisateur
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Modèle User
const User = mongoose.model('User', userSchema);

module.exports = User;