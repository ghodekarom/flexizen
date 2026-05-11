import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../api/adminApi';
import AdminLayout from '../../components/AdminLayout';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getDashboardStats();
                setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <AdminLayout><div className="text-center py-10">Loading Stats...</div></AdminLayout>;

    const statCards = [
        { label: 'Total Classes', value: stats?.totalClasses, color: 'bg-blue-500' },
        { label: 'Total Bookings', value: stats?.totalBookings, color: 'bg-indigo-500' },
        { label: 'New Bookings', value: stats?.newBookings, color: 'bg-yellow-500' },
        { label: 'Approved Bookings', value: stats?.approvedBookings, color: 'bg-green-500' },
        { label: 'Cancelled Bookings', value: stats?.cancelledBookings, color: 'bg-red-500' },
        { label: 'Total Enquiries', value: stats?.totalEnquiries, color: 'bg-purple-500' },
        { label: 'Unread Enquiries', value: stats?.unreadEnquiries, color: 'bg-pink-500' },
    ];

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card) => (
                    <div key={card.label} className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderLeftColor: card.color.replace('bg-', '') }}>
                        <p className="text-sm font-medium text-gray-500 truncate">{card.label}</p>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">{card.value || 0}</p>
                    </div>
                ))}
            </div>
            
            <div className="mt-10 bg-white rounded-lg shadow p-8">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="flex space-x-4">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Add New Class</button>
                    <button className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-50">View Recent Bookings</button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
