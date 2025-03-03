import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "../auth/login.jsx";
import Register from "../auth/register.jsx";


const AuthRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Navigate to="/Acceuil" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
    );
};

export default AuthRoutes;
