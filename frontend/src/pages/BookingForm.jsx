import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPublicClassDetails, submitPublicBooking } from '../api/publicApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [yogaClass, setYogaClass] = useState(null);
    const [formData, setFormData] = useState({
        customerName: '', customerEmail: '', customerPhone: ''
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchClass = async () => {
            try {
                const res = await getPublicClassDetails(id);
                setYogaClass(res.data);
            } catch (err) {
                setError("Could not load class details.");
            } finally {
                setLoading(false);
            }
        };
        fetchClass();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const res = await submitPublicBooking({
                ...formData,
                yogaClass: { id: parseInt(id) }
            });
            if (res.status === 'success') {
                setSuccess(res.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Booking failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow py-20 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Info Side */}
                    <div className="bg-indigo-600 text-white p-12">
                        <h2 className="text-3xl font-bold mb-6">Complete Your Booking</h2>
                        {yogaClass && (
                            <div className="space-y-6">
                                <div>
                                    <p className="text-indigo-200 text-sm uppercase tracking-widest font-bold mb-1">Class Selected</p>
                                    <p className="text-2xl font-semibold">{yogaClass.name}</p>
                                </div>
                                <div>
                                    <p className="text-indigo-200 text-sm uppercase tracking-widest font-bold mb-1">Time & Schedule</p>
                                    <p className="text-lg">{yogaClass.schedule}</p>
                                </div>
                                <div className="pt-6 border-t border-indigo-500">
                                    <p className="text-4xl font-bold">${yogaClass.fee}</p>
                                    <p className="text-indigo-200 text-sm">Payment will be collected at the studio.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form Side */}
                    <div className="p-12">
                        {success ? (
                            <div className="text-center py-10">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Booking Successful!</h3>
                                <p className="text-gray-600 mb-8 font-medium">Your booking number is: <br/><span className="text-2xl text-indigo-600 font-bold">{success.bookingNumber}</span></p>
                                <button onClick={() => navigate('/classes')} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg">Return to Classes</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
                                
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                    <input type="text" required className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} placeholder="Enter your name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                    <input type="email" required className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        value={formData.customerEmail} onChange={e => setFormData({...formData, customerEmail: e.target.value})} placeholder="email@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                    <input type="text" required className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        value={formData.customerPhone} onChange={e => setFormData({...formData, customerPhone: e.target.value})} placeholder="Your phone number" />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={submitting}
                                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl disabled:opacity-50"
                                >
                                    {submitting ? 'Confirming...' : 'Confirm Booking'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BookingForm;
