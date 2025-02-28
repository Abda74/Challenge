import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "../auth/login.jsx";
import Register from "../auth/register.jsx";


const AuthRoutes = () => {
    return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
    );
};

export default AuthRoutes;
