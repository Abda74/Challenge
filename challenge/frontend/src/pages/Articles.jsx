import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import ArticleForm from "../components/articles/ArticleForm.jsx";
import { MantineProvider } from "@mantine/core";
import Header from "../components/header/Header.jsx";

const Articles = () => {
    const navigate = useNavigate();

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        console.log("Utilisateur déconnecté");

        // - Supprimer le token d'authentification
        localStorage.removeItem('authToken');

        // Rediriger vers la page de connexion
        navigate('/login');
    };

    return (
        <div>
            <MantineProvider>
                {/* Passer la fonction handleLogout au Header */}
                <Header onLogout={handleLogout} showLoginButton={false} />
                <ArticleForm />
            </MantineProvider>
        </div>
    );
};

export default Articles;