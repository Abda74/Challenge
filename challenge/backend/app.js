const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const cors = require('cors');

dotenv.config();
connectDB().then(r => console.log(r));

const app = express();

// Autoriser toutes les origines (pour le développement uniquement)
app.use(cors());

app.use(cors({
    origin: 'http://challenge-kpfy.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Augmenter la taille maximale du corps de la requête à 10 Mo
app.use(express.json({ limit: '10mb' }));


// Routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// Route de test
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
