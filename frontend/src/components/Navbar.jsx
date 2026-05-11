import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">FlexiZen</Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Home</Link>
                        <Link to="/classes" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Classes</Link>
                        <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">About</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Contact</Link>
                        <Link to="/admin/login" className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-sm">Admin Portal</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
