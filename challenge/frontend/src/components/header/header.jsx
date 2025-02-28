import React from 'react';
import Logo from '../../assets/img.png';
import { Link } from 'react-router-dom';  // Utilisation de Link de react-router-dom

const Header = () => {
    return (
        <header className="p-10 w-full flex justify-between items-center align-center h-[67px] border-b mb-3 bg-white">
            <div className="flex items-center">
                <img src={Logo} alt="Kimbiz Logo" className="w-10 h-auto mr-3" />
                <h1 className="text-2xl font-bold">Kimbiz</h1>
            </div>

            <div>
                <Link
                    to="/login"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Me connecter
                </Link>
            </div>
        </header>
    );
}

export default Header;
