const Article = require('../models/Articles');
const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose");

// Créer un article
exports.createArticle = async (req, res) => {
    const { title, theme, content, image } = req.body;

    try {
        const article = new Article({
            title,
            theme,
            content,
            image, // Stocker l'image en base64
            author: uuidv4(), // Générer un UUID pour l'auteur
        });

        await article.save();
        res.status(201).json(article);
    } catch (error) {
        console.error("Erreur lors de la création de l'article : ", error); // Log l'erreur
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Récupérer tous les articles
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('author', 'username');
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Récupérer un article par ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('author', 'username');
        if (!article) return res.status(404).json({ message: 'Article non trouvé' });

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Mettre à jour un article
exports.updateArticle = async (req, res) => {
    const { title, theme, content, image } = req.body;

    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article non trouvé' });

        article.title = title || article.title;
        article.theme = theme || article.theme;
        article.content = content || article.content;
        article.image = image || article.image;

        await article.save();
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Supprimer un article
exports.deleteArticle = async (req, res) => {
    console.log("Requête de suppression reçue pour l'ID :", req.params.id);
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.log("ID invalide :", req.params.id);
            return res.status(400).json({ message: 'ID invalide' });
        }

        const article = await Article.findById(req.params.id);
        if (!article) {
            console.log("Article non trouvé");
            return res.status(404).json({ message: 'Article non trouvé' });
        }

        await Article.findByIdAndDelete(req.params.id);
        console.log("Article supprimé");
        res.status(200).json({ message: 'Article supprimé avec succès' });
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Liker un article
exports.likeArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }

        article.likes += 1; // Augmenter le nombre de likes
        await article.save();

        res.status(200).json({ likes: article.likes });
    } catch (error) {
        console.error("Erreur lors du like de l'article : ", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Disliker un article
exports.dislikeArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }

        if (article.likes > 0) {
            article.likes -= 1; // Décrémenter le nombre de likes
        }

        await article.save();

        res.status(200).json({ likes: article.likes });
    } catch (error) {
        console.error("Erreur lors du dislike de l'article : ", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
