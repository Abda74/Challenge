import React from 'react';
import Logo from '../../assets/img.png';
import { Link } from 'react-router-dom';

const Header = ({ onLogout, showLoginButton = true }) => {
    return (
        <div className="py-2 border-b-2 mb-3">
            <header className="container m-auto w-full flex justify-between items-center align-center h-[67px] bg-white">
                <div className="flex items-center">
                    <img src={Logo} alt="Kimbiz Logo" className="w-10 h-auto mr-3" />
                    <h1 className="text-2xl font-bold">Kimbiz</h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Bouton "Se déconnecter" */}
                    {onLogout && (
                        <button
                            onClick={onLogout}
                            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Se déconnecter
                        </button>
                    )}

                    {/* Bouton "Me connecter" (conditionnel) */}
                    {showLoginButton && (
                        <Link
                            to="/login"
                            className="px-6 py-2 sm:px-6 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Me connecter
                        </Link>
                    )}
                </div>
            </header>
        </div>
    );
};

export default Header;