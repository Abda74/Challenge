import React, { useState, useEffect } from "react";
import { RichTextEditor } from "@mantine/rte";
import axios from "axios";

const ArticleForm = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [theme, setTheme] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [articles, setArticles] = useState([]); // État pour stocker les articles
    const [editArticleId, setEditArticleId] = useState(null); // État pour gérer l'édition d'un article

    // Fonction pour récupérer les articles
    const fetchArticles = async () => {
        try {
            const response = await axios.get("http://localhost:5200/api/articles");
            setArticles(response.data); // Mettre à jour la liste des articles
        } catch (error) {
            console.error("Erreur lors de la récupération des articles : ", error);
        }
    };

    // Récupérer les articles au chargement du composant
    useEffect(() => {
        fetchArticles();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Convertir l'image en base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        if (!title || !content) {
            setError("Veuillez remplir tous les champs obligatoires.");
            setLoading(false);
            return;
        }

        const articleData = {
            title,
            theme,
            content,
            image, // Envoyer l'image en base64
        };

        try {
            let response;
            if (editArticleId) {
                // Mettre à jour un article existant
                response = await axios.put(`http://localhost:5200/api/articles/${editArticleId}`, articleData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } else {
                // Créer un nouvel article
                response = await axios.post("http://localhost:5200/api/articles", articleData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }

            if (response.status === 200 || response.status === 201) {
                alert(editArticleId ? "Article mis à jour avec succès!" : "Article publié avec succès!");
                setTitle("");
                setTheme("");
                setContent("");
                setImage(null);
                setEditArticleId(null); // Réinitialiser l'ID d'édition
                fetchArticles(); // Récupérer la liste mise à jour des articles
            }
        } catch (error) {
            console.error("Erreur : ", error);
            if (error.response) {
                setError(`Erreur : ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                setError("Aucune réponse du serveur. Veuillez vérifier votre connexion réseau.");
            } else {
                setError("Erreur lors de la configuration de la requête.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour supprimer un article
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5200/api/articles/${id}`);
            if (response.status === 200) {
                alert("Article supprimé avec succès!");
                fetchArticles(); // Récupérer la liste mise à jour des articles
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'article : ", error);
        }
    };

    // Fonction pour modifier un article
    const handleEdit = (article) => {
        setTitle(article.title);
        setTheme(article.theme);
        setContent(article.content);
        setImage(article.image);
        setEditArticleId(article._id); // Définir l'ID de l'article à modifier
    };

    return (
        <div className="p-4 mx-auto bg-white shadow-md rounded-lg container">
            <h1 className="mb-10 text-3xl font-bold">{editArticleId ? "Modifier l'article" : "Ajouter un article"}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center border-b p-6">
                    <label className="text-gray-700 font-bold w-1/4">Titre de l'article</label>
                    <input
                        type="text"
                        placeholder="Entrer un titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-2 w-full border-2 focus:outline-none"
                        required
                    />
                </div>

                <div className="mb-4 flex items-center border-b p-6">
                    <label className="text-gray-700 font-bold w-1/4">Thème</label>
                    <input
                        type="text"
                        placeholder="Entrer un thème"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="p-2 w-full border-2 focus:outline-none"
                    />
                </div>

                <div className="mb-4 flex items-center border-b p-6">
                    <label className="text-gray-700 font-bold w-1/4">Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="p-2 w-full border-2 focus:outline-none"
                        accept="image/*"
                    />
                </div>

                <div className="mb-4 flex items-center border-b p-6">
                    <label className="block text-gray-700 font-bold mb-2 w-1/4 translate-y-[-106px]">Contenu</label>
                    <RichTextEditor
                        className="h-72 p-2 w-full border-2 focus:outline-none"
                        value={content}
                        onChange={setContent}
                        required
                        placeholder="Entrer un contenu"
                    />
                </div>

                <div className="flex col justify-end">
                    <button
                        type="button"
                        className="text-black px-4 py-2 rounded-md mr-2"
                        onClick={() => {
                            setTitle("");
                            setTheme("");
                            setContent("");
                            setImage(null);
                            setEditArticleId(null); // Réinitialiser l'édition
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        disabled={loading}
                    >
                        {loading ? (editArticleId ? "Mise à jour..." : "Publication...") : (editArticleId ? "Mettre à jour" : "Publier l'article")}
                    </button>
                </div>
            </form>

            {/* Liste des articles */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Liste des articles</h2>
                {articles.length === 0 ? (
                    <p>Aucun article disponible.</p>
                ) : (
                    <ul className="space-y-4">
                        {articles.map((article) => (
                            <li key={article._id} className="border p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-bold">{article.title}</h3>
                                <p className="text-gray-600">{article.theme}</p>
                                <div className="mt-2 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(article)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(article._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ArticleForm;