import React, { useState, useEffect } from "react";
import { RichTextEditor } from "@mantine/rte";
import axios from "axios";
import { Link } from "react-router-dom";

const ArticleForm = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [theme, setTheme] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [articles, setArticles] = useState([]);
    const [editArticleId, setEditArticleId] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get("https://challenge-admin.vercel.app/api/articles");
            setArticles(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles : ", error);
        }
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        if (!title || !content) {
            setError("Veuillez remplir tous les champs obligatoires.");
            setLoading(false);
            return;
        }

        const articleData = { title, theme, content, image };

        try {
            let response;
            if (editArticleId) {
                response = await axios.put(`https://challenge-admin.vercel.app/api/articles/${editArticleId}`, articleData);
            } else {
                response = await axios.post("https://challenge-admin.vercel.app/api/articles", articleData);
            }

            if (response.status === 200 || response.status === 201) {
                alert(editArticleId ? "Article mis à jour avec succès!" : "Article publié avec succès!");
                setTitle("");
                setTheme("");
                setContent("");
                setImage(null);
                setEditArticleId(null);
                fetchArticles();
            }
        } catch (error) {
            console.error("Erreur : ", error);
            setError("Une erreur est survenue lors de la publication de l'article.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://challenge-admin.vercel.app/api/articles/${id}`);
            if (response.status === 200) {
                alert("Article supprimé avec succès!");
                fetchArticles();
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'article : ", error);
        }
    };

    const handleEdit = (article) => {
        setTitle(article.title);
        setTheme(article.theme);
        setContent(article.content);
        setImage(article.image);
        setEditArticleId(article._id);
    };

    return (
        <div className="p-4 mx-auto bg-white shadow-md rounded-lg container">
            <h1 className="mb-10 text-3xl font-bold">{editArticleId ? "Modifier l'article" : "Ajouter un article"}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-bold">Titre</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2" required />
                </div>
                <div className="mb-4">
                    <label className="block font-bold">Thème</label>
                    <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full border p-2" />
                </div>
                <div className="mb-4">
                    <label className="block font-bold">Image</label>
                    <input type="file" onChange={handleImageChange} className="w-full border p-2" accept="image/*" />
                </div>
                <div className="mb-4">
                    <label className="block font-bold">Contenu</label>
                    <RichTextEditor value={content} onChange={setContent} required placeholder="Entrer un contenu" />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                        {loading ? (editArticleId ? "Mise à jour..." : "Publication...") : (editArticleId ? "Mettre à jour" : "Publier")}
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
                                <button onClick={() => handleEdit(article)} className="bg-yellow-500 text-white px-3 py-1 rounded">Modifier</button>
                                <button onClick={() => handleDelete(article._id)} className="bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
                                <Link to="/" className="bg-green-500 text-white px-3 py-1 rounded">Voir l'article</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ArticleForm;
