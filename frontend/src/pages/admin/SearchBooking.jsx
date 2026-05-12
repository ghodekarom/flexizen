import React, { useState } from 'react';
import { searchBookingByNumber, updateBookingStatus } from '../../api/bookingApi';
import AdminLayout from '../../components/AdminLayout';

const SearchBooking = () => {
    const [query, setQuery] = useState('');
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;
        setLoading(true);
        setError('');
        setBooking(null);
        try {
            const res = await searchBookingByNumber(query);
            setBooking(res.data);
        } catch (err) {
            setError("Booking not found.");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        try {
            const res = await updateBookingStatus(booking.id, newStatus);
            setBooking(res.data);
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Find Booking by Reference</h2>
                <form onSubmit={handleSearch} className="flex space-x-4 mb-12">
                    <input 
                        type="text" 
                        placeholder="e.g. FX-12345678"
                        className="flex-grow px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all">Search</button>
                </form>

                {loading && <div className="text-center py-10 font-bold text-gray-400">Searching...</div>}
                
                {error && <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center font-bold border border-red-100">{error}</div>}

                {booking && (
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in duration-500">
                        <div className="bg-indigo-600 p-8 text-white flex justify-between items-center">
                            <div>
                                <div className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Booking Number</div>
                                <div className="text-2xl font-bold">{booking.bookingNumber}</div>
                            </div>
                            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-xl text-sm font-bold uppercase">
                                {booking.status}
                            </div>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-gray-400 text-xs font-bold uppercase mb-1">Class</div>
                                    <div className="font-bold text-gray-800">{booking.yogaClass.name}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs font-bold uppercase mb-1">Date</div>
                                    <div className="font-bold text-gray-800">{new Date(booking.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs font-bold uppercase mb-1">Customer</div>
                                    <div className="font-bold text-gray-800">{booking.customerName}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs font-bold uppercase mb-1">Email</div>
                                    <div className="font-bold text-gray-800 break-all">{booking.customerEmail}</div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-100 flex justify-center space-x-4">
                                {booking.status === 'PENDING' && (
                                    <>
                                        <button onClick={() => handleStatusUpdate('APPROVED')} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-md">Approve Booking</button>
                                        <button onClick={() => handleStatusUpdate('CANCELLED')} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-md">Cancel Booking</button>
                                    </>
                                )}
                                {booking.status === 'APPROVED' && (
                                    <button onClick={() => handleStatusUpdate('CANCELLED')} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-md">Cancel Booking</button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default SearchBooking;
