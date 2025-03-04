import React, { useState, useEffect } from "react";
import { RichTextEditor } from "@mantine/rte";
import axios from "axios";
import { Link } from "react-router-dom";

const ArticleForm = () => {
    // États pour gérer les données du formulaire
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [theme, setTheme] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [articles, setArticles] = useState([]);
    const [editArticleId, setEditArticleId] = useState(null);

    // Charger les articles au montage du composant
    useEffect(() => {
        fetchArticles();
    }, []);

    // Fonction pour récupérer les articles depuis l'API
    const fetchArticles = async () => {
        try {
            const response = await axios.get("https://challenge-admin.vercel.app/api/articles");
            setArticles(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles : ", error);
        }
    };

    // Gérer le changement d'image
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Soumettre le formulaire (ajout ou modification d'un article)
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        // Validation des champs obligatoires
        if (!title || !content) {
            setError("Veuillez remplir tous les champs obligatoires.");
            setLoading(false);
            return;
        }

        // Données de l'article à envoyer à l'API
        const articleData = { title, theme, content, image };

        try {
            let response;
            if (editArticleId) {
                // Mettre à jour un article existant
                response = await axios.put(
                    `https://challenge-admin.vercel.app/api/articles/${editArticleId}`,
                    articleData
                );
            } else {
                // Créer un nouvel article
                response = await axios.post(
                    "https://challenge-admin.vercel.app/api/articles",
                    articleData
                );
            }

            // Si la requête réussit
            if (response.status === 200 || response.status === 201) {
                alert(editArticleId ? "Article mis à jour avec succès!" : "Article publié avec succès!");
                setTitle("");
                setTheme("");
                setContent("");
                setImage(null);
                setEditArticleId(null);
                fetchArticles(); // Rafraîchir la liste des articles
            }
        } catch (error) {
            console.error("Erreur : ", error);
            setError("Une erreur est survenue lors de la publication de l'article.");
        } finally {
            setLoading(false);
        }
    };

    // Supprimer un article
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token"); // Récupérer le token JWT
            const response = await axios.delete(
                `https://challenge-admin.vercel.app/api/articles/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
                    },
                }
            );
            console.log("Réponse de l'API :", response);
            if (response.status === 200) {
                alert("Article supprimé avec succès!");
                fetchArticles();
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'article : ", error);
        }
    };

    // Modifier un article existant
    const handleEdit = (article) => {
        setTitle(article.title);
        setTheme(article.theme);
        setContent(article.content);
        setImage(article.image);
        setEditArticleId(article._id);
    };

    return (
        <div className="p-4 mx-auto bg-white shadow-md rounded-lg container">
            <h1 className="mb-10 text-3xl font-bold">
                {editArticleId ? "Modifier l'article" : "Ajouter un article"}
            </h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-bold">Titre</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold">Thème</label>
                    <input
                        type="text"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-full border p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold">Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full border p-2"
                        accept="image/*"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold">Contenu</label>
                    <div className="border rounded p-2 h-96 overflow-auto">
                        <RichTextEditor
                            value={content}
                            onChange={setContent}
                            required
                            placeholder="Entrer un contenu"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading
                            ? editArticleId
                                ? "Mise à jour..."
                                : "Publication..."
                            : editArticleId
                                ? "Mettre à jour"
                                : "Publier"}
                    </button>
                </div>
            </form>

            <h2 className="text-2xl font-bold mt-10">Liste des articles</h2>
            {articles.length === 0 ? (
                <p>Aucun article disponible.</p>
            ) : (
                <ul>
                    {articles.map((article) => (
                        <li key={article._id} className="border p-4 rounded mt-2">
                            <h3 className="font-bold">{article.title}</h3>
                            <p>{article.theme}</p>
                            <div className="mt-2 flex gap-2">
                                <button
                                    onClick={() => handleEdit(article)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded focus:bg-yellow-600"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(article._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded focus:bg-red-900"
                                >
                                    Supprimer
                                </button>
                                <Link
                                    to="/"
                                    className="bg-green-500 text-white px-3 py-1 rounded focus:bg-green-900"
                                >
                                    Voir l'article
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ArticleForm;