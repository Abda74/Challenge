const express = require('express');
const router = express.Router();
const { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle } = require('../controllers/articleController');

// Route pour créer un article (pas de protection d'authentification pour l'instant)
router.post('/', createArticle);

// Routes pour les autres opérations
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
