import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/img.png";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5200/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); // Save token for future requests
                navigate('/articles');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Erreur du serveur');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-12 rounded-lg shadow-lg w-96">
                <div className="w-full mb-5">
                    <div className="text-center mb-8 flex justify-center">
                        <img src={Logo} alt="" width={40} height={30} className="mr-2"/>
                        <h1 className="text-2xl font-bold text-blue-700">Kimbiiz</h1>
                    </div>
                    <p>Entrer vos identifiants pour accéder à votre compte</p>
                </div>

                {error && <div className="text-red-500 text-center">{error}</div>}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Entrez votre nom d'utilisateur"
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Entrez votre mot de passe"
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Se connecter
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/register" className="text-sm text-blue-500 hover:text-blue-700">S'inscrire</Link>
                </div>
                <div className="mt-2 text-center">
                    <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">Mot de passe oublié ?</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
