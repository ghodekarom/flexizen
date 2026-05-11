import React, { useState } from 'react';
import { submitPublicEnquiry } from '../api/publicApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitPublicEnquiry(formData);
            setStatus({ type: 'success', text: 'Thank you! Your message has been sent.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setStatus({ type: 'error', text: 'Something went wrong. Please try again.' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-12 rounded-3xl shadow-lg">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                        <p className="text-gray-600">Have questions about our classes or studio? Drop us a message.</p>
                    </div>

                    {status.text && (
                        <div className={`mb-8 p-4 rounded-xl text-sm font-bold ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {status.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                            <input type="text" required className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input type="email" required className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                            <input type="text" required className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                                value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                            <textarea rows="6" required className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                        </div>
                        <div className="md:col-span-2 text-center">
                            <button type="submit" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-indigo-700 transition-all">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
