import React, { useState, useEffect } from 'react';
import { getPublicClasses } from '../api/publicApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await getPublicClasses();
                setClasses(res.data);
            } catch (error) {
                console.error("Failed to fetch classes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Our Yoga Classes</h2>
                        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">Choose a session that speaks to you and reserve your spot today.</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {classes.map((cls) => (
                                <div key={cls.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col border border-gray-100 group">
                                    <div className="p-8 flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{cls.name}</h3>
                                            <span className="bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold">${cls.fee}</span>
                                        </div>
                                        <p className="text-gray-600 mb-6 line-clamp-3">{cls.description}</p>
                                        <div className="space-y-3 text-sm font-medium text-gray-500">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                {cls.schedule} ({cls.durationMinutes} min)
                                            </div>
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                                Capacity: {cls.capacity} spots
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-8 pb-8">
                                        <Link 
                                            to={`/book/${cls.id}`} 
                                            className="block w-full text-center bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Classes;
