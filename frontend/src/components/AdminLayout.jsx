import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminLayout = ({ children }) => {
    const { logout, adminUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Manage Classes', path: '/admin/classes' },
        { name: 'Profile', path: '/admin/profile' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-indigo-900 text-white flex-shrink-0">
                <div className="p-6">
                    <h2 className="text-2xl font-bold">FlexiZen</h2>
                    <p className="text-indigo-300 text-xs mt-1">Admin Panel</p>
                </div>
                <nav className="mt-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`block px-6 py-3 hover:bg-indigo-800 transition-colors ${
                                location.pathname === item.path ? 'bg-indigo-800 border-l-4 border-white' : ''
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-6 py-3 hover:bg-red-800 transition-colors mt-10 text-red-200"
                    >
                        Logout
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
                    <h1 className="text-xl font-semibold text-gray-800">
                        {navItems.find(item => item.path === location.pathname)?.name || 'Admin'}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{adminUser?.name}</p>
                            <p className="text-xs text-gray-500">{adminUser?.email}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                            {adminUser?.name?.charAt(0)}
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
