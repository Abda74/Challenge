import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Importation des composants ou pages
import Acceuil from "../pages/Acceuil.jsx";
import Articles from "../pages/Articles.jsx";
import Layout from "../pages/Layout.jsx";

const MyRoutes = () => {
    return (
        <Routes>

            <Route element={<Layout />}>
                {/* Définition des routes */}
                <Route path="/" element={<Acceuil />} />
               <Route path="/articles" element={<Articles />} />
            </Route>

        </Routes>
    );
};

export default MyRoutes;
