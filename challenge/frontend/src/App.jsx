import React from "react";
import {BrowserRouter, } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";
import AuthRoutes from "./routes/AuthRoutes.jsx"; // Assure-toi que le chemin d'importation est correct

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthRoutes />
                <MyRoutes />
            </BrowserRouter>
        </div>
    );
};

export default App;
