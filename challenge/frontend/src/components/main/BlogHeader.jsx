import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Importer l'icône de recherche

const BlogHeader = ({ onSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [articles, setArticles] = useState([]);

    // Récupérer les articles depuis l'API au chargement du composant
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('https://challenge-admin.vercel.app/api/articles');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des articles');
                }
                const data = await response.json();
                setArticles(data); // Stocker les articles dans l'état
            } catch (error) {
                console.error("Erreur lors de la récupération des articles:", error);
            }
        };

        fetchArticles();
    }, []);

    // Gérer la saisie dans le champ de recherche
    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value); // Mettre à jour l'état local avec la saisie
    };

    // Gérer la pression de la touche "Entrée" pour lancer la recherche
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Si le terme de recherche est vide, retourner tous les articles
            if (searchTerm.trim() === "") {
                onSearchResults(articles);
                return;
            }

            // Filtrer les articles en fonction du terme de recherche
            const filteredArticles = articles.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.theme.toLowerCase().includes(searchTerm.toLowerCase()) // Ajout du filtrage par thème
            );

            // Passer les articles filtrés au composant parent via la prop `onSearchResults`
            onSearchResults(filteredArticles);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            {/* Conteneur pour le titre et le champ de recherche */}
            <div className="flex items-center justify-between">
                {/* Titre Blog */}
                <h1 className="text-3xl font-bold text-gray-800">Blog</h1>

                {/* Champ de recherche avec icône */}
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <FaSearch className="text-gray-400 mr-2" />
                    <input
                        type="search"
                        placeholder="Rechercher..."
                        className="w-full bg-transparent border-none outline-none placeholder-gray-500"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        onKeyDown={handleKeyPress}
                    />
                </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
                Acquérez de nouvelles connaissances et laissez-vous inspirer par des articles sur la tech rédigés par des experts et des professionnels de la programmation, du design, du devops, et bien d'autres domaines connexes.
            </p>
        </div>
    );
};

export default BlogHeader;
