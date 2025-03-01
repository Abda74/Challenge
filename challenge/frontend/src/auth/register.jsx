import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/img.png";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Ajout de l'état isLoading
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setIsLoading(true); // Démarre le chargement

        try {
            const response = await fetch('https://challenge-admin.vercel.app/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Erreur du serveur');
        } finally {
            setIsLoading(false); // Termine le chargement
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="text-center mb-8 flex justify-center">
                    <img src={Logo} alt="" width={40} height={30} className="mr-2"/>
                    <h1 className="text-2xl font-bold text-blue-700">Kimbiiz</h1>
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Entrez votre email"
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirmez votre mot de passe"
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-lg hover:${isLoading ? '' : 'bg-green-600'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                            disabled={isLoading} // Désactive le bouton si le chargement est en cours
                        >
                            {isLoading ? 'Inscription en cours...' : "S'inscrire"}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm">Vous avez déjà un compte ? <Link to="/login" className="text-blue-500 hover:text-blue-700">Se connecter</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
