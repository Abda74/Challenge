const express = require('express');
const router = express.Router();
const { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle, dislikeArticle, likeArticle} = require('../controllers/articleController');

// Route pour créer un article (pas de protection d'authentification pour l'instant)
router.post('/', createArticle);

// Routes pour les autres opérations
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);
router.post('/:id/like', likeArticle);
router.post('/:id/dislike', dislikeArticle);

module.exports = router;
