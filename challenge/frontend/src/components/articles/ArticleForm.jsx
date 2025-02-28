import React, { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import axios from "axios";

const ArticleForm = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [theme, setTheme] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
            const response = await axios.post("http://localhost:5200/api/articles", articleData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                alert("Article publié avec succès!");
                setTitle("");
                setTheme("");
                setContent("");
                setImage(null);
            }
        } catch (error) {
            console.error("Erreur : ", error);
            if (error.response) {
                setError(`Erreur lors de la publication de l'article: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                setError("Aucune réponse du serveur. Veuillez vérifier votre connexion réseau.");
            } else {
                setError("Erreur lors de la configuration de la requête.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 mx-auto bg-white shadow-md rounded-lg container">
            <h1 className="mb-10 text-3xl font-bold">Ajouter un article</h1>
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
                        onClick={() => alert("Annulé")}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        disabled={loading}
                    >
                        {loading ? "Publication..." : "Publier l'article"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArticleForm;