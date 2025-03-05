import React, { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa"; // Import de l'icône de pouce levé

const Articles = ({ selectedTopic }) => {
    const [articles, setArticles] = useState([]);
    const [expandedArticles, setExpandedArticles] = useState({}); // État pour suivre les articles développés
    const [likes, setLikes] = useState({});

    // Fonction pour basculer l'état d'un article (développé/réduit)
    const handleReadArticle = (articleId) => {
        setExpandedArticles((prevState) => ({
            ...prevState,
            [articleId]: !prevState[articleId], // Inverse l'état actuel
        }));
    };

    // Fonction pour gérer les likes et dislikes
    const handleLike = (articleId) => {
        setLikes((prevState) => {
            const currentLikes = prevState[articleId] || 0;
            const newLikes = currentLikes > 0 ? currentLikes - 1 : currentLikes + 1; // Incrémente ou décrémente les likes
            return {
                ...prevState,
                [articleId]: newLikes,
            };
        });
    };

    // Fetch des articles depuis l'API
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('https://challenge-admin.vercel.app/api/articles');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des articles');
                }
                const data = await response.json();
                setArticles(data);

                // Initialiser les likes avec les valeurs existantes (si disponibles)
                const initialLikes = {};
                data.forEach((article) => {
                    initialLikes[article._id] = article.likes || 0;
                });
                setLikes(initialLikes);
            } catch (error) {
                console.error("Erreur lors de la récupération des articles:", error);
            }
        };

        fetchArticles();
    }, []);

    // Filtrer les articles en fonction du thème sélectionné
    const filteredArticles = selectedTopic
        ? articles.filter((article) => article.theme === selectedTopic)
        : articles;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                    <div key={article._id} className="border-b border-gray-200 pb-6">
                        <header className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                        </header>
                        <p className="text-sm text-gray-500 mt-2">
                            {new Date(article.createdAt).toLocaleDateString()}
                        </p>
                        <div
                            className={`mt-4 text-gray-700 flex ${expandedArticles[article._id] ? 'flex-col ' : 'flex-row'} justify-between items-start`}
                        >
                            <div
                                className={`  flex-1 mb-4 overflow-hidden transition-all duration-300 ${expandedArticles[article._id] ? ' order-2 max-h-full' : 'max-h-20'}`}
                            >
                                {/* Utilisation de dangerouslySetInnerHTML pour afficher le contenu HTML */}
                                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                            </div>
                            <img
                                src={article.image}
                                alt="Image de l'article"
                                className={`w-[300px] h-[200px] object-cover rounded-lg ${expandedArticles[article._id] ? 'mb-7 w-full order-1 mt-4' : 'ml-4 float-right'}`}
                            />


                        </div>

                        {/* Bouton "Lire l'article complet" ou "Réduire" */}
                        <button
                            onClick={() => handleReadArticle(article._id)}
                            className="mt-4 text-blue-600 hover:text-blue-800"
                        >
                            {expandedArticles[article._id] ? "Réduire" : "Lire l'article complet"}
                        </button>
                        {/* Bouton "Like/Dislike" avec icône de pouce levé */}
                        <button
                            onClick={() => handleLike(article._id)}
                            className="mt-4 flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                        >
                            <FaThumbsUp className={`text-lg ${likes[article._id] > 0 ? 'text-blue-600' : 'text-gray-600'}`} />
                            <span>{likes[article._id] || 0}</span> {/* Affiche le nombre de likes */}
                        </button>
                        <footer className="mt-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">Thème:</span>
                                <span className="text-sm text-blue-600">{article.theme}</span>
                            </div>
                        </footer>
                    </div>
                ))
            ) : (
                <p>Aucun article trouvé.</p>
            )}
        </div>
    );
};

export default Articles;
