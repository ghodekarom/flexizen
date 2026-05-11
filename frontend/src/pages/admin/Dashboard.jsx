import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { adminUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-indigo-600">FlexiZen Admin</h1>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-4 text-gray-700">Welcome, {adminUser?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex flex-col items-center justify-center bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Phase 3 Complete!</h2>
                        <p className="text-gray-600">You have successfully authenticated via Spring Security Session.</p>
                        <p className="text-gray-600 mt-2">Dashboard features will be built in Phase 4.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
