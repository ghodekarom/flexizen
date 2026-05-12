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
        { name: 'Bookings', path: '/admin/bookings' },
        { name: 'Enquiries', path: '/admin/enquiries' },
        { name: 'Search Booking', path: '/admin/search' },
        { name: 'Profile', path: '/admin/profile' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-indigo-900 text-white flex-shrink-0">
                <div className="p-8">
                    <h2 className="text-2xl font-bold tracking-tight">FlexiZen</h2>
                    <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mt-1">Management Suite</p>
                </div>
                <nav className="mt-4 px-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                                location.pathname === item.path 
                                ? 'bg-white text-indigo-900 shadow-lg ring-1 ring-white/20' 
                                : 'text-indigo-100 hover:bg-white/10'
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="pt-10">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-red-300 hover:bg-red-900/30 transition-all border border-red-900/20"
                        >
                            Logout Session
                        </button>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm h-20 flex items-center justify-between px-10">
                    <h1 className="text-xl font-extrabold text-gray-900 uppercase tracking-wider">
                        {navItems.find(item => item.path === location.pathname)?.name || 'Admin'}
                    </h1>
                    <div className="flex items-center space-x-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-900">{adminUser?.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{adminUser?.email}</p>
                        </div>
                        <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-black shadow-inner ring-1 ring-indigo-200">
                            {adminUser?.name?.charAt(0)}
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-10 bg-gray-50/50">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
