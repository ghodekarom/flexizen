import React, { useState, useEffect } from 'react';
import { getAllBookings, updateBookingStatus } from '../../api/bookingApi';
import AdminLayout from '../../components/AdminLayout';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, [statusFilter]);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await getAllBookings(statusFilter);
            setBookings(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateBookingStatus(id, newStatus);
            fetchBookings();
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200';
            case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
                <h2 className="text-2xl font-bold text-gray-800">Manage Bookings</h2>
                <div className="flex items-center space-x-4 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                    <span className="text-sm font-bold text-gray-500 ml-2">Filter:</span>
                    <select 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 text-sm font-semibold text-gray-700 cursor-pointer"
                    >
                        <option value="">All Bookings</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
            ) : (
                <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Booking Info</th>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Details</th>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-8 py-5 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {bookings.length === 0 ? (
                                    <tr><td colSpan="4" className="px-8 py-10 text-center text-gray-500">No bookings found.</td></tr>
                                ) : (
                                    bookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="text-sm font-bold text-indigo-600 mb-1">{booking.bookingNumber}</div>
                                                <div className="text-sm font-semibold text-gray-900">{booking.yogaClass.name}</div>
                                                <div className="text-xs text-gray-500 mt-1">{new Date(booking.createdAt).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-sm font-bold text-gray-900">{booking.customerName}</div>
                                                <div className="text-sm text-gray-600">{booking.customerEmail}</div>
                                                <div className="text-xs text-gray-500">{booking.customerPhone}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-4 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full border ${getStatusColor(booking.status)}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right space-x-3">
                                                {booking.status === 'PENDING' && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleStatusChange(booking.id, 'APPROVED')}
                                                            className="text-green-600 hover:text-green-900 text-sm font-bold"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button 
                                                            onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                                                            className="text-red-600 hover:text-red-900 text-sm font-bold"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                                {booking.status === 'APPROVED' && (
                                                    <button 
                                                        onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                                                        className="text-red-600 hover:text-red-900 text-sm font-bold"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ManageBookings;
