import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SearchByTopic = ({ onSelectTopic }) => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await fetch('https://challenge-admin.vercel.app/api/articles');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des articles');
                }
                const data = await response.json();

                // Extraire les thèmes uniques des articles
                const uniqueTopics = [...new Set(data.map(article => article.theme))];
                setTopics(uniqueTopics);
            } catch (error) {
                console.error("Erreur lors de la récupération des articles:", error);
            }
        };

        fetchTopics();
    }, []);

    return (
        <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recherchez par thème</h3>
            <ul className="space-y-4">
                {topics.map((topic, index) => (
                    <li key={index} className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => onSelectTopic(topic)}
                                className="text-lg text-gray-700 hover:text-blue-500"
                            >
                                {topic}
                            </button>
                        </div>
                        <FaSearch className="text-gray-500" />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default SearchByTopic;