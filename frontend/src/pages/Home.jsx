import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative bg-indigo-900 text-white py-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">Find Your Balance, <br/><span className="text-indigo-400">Find Your Zen.</span></h1>
                            <p className="text-xl text-indigo-100 mb-10">Join our community and transform your body and mind through expert-led yoga sessions designed for every level.</p>
                            <div className="flex space-x-4">
                                <Link to="/classes" className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl">Explore Classes</Link>
                                <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-900 transition-all">Get in Touch</Link>
                            </div>
                        </div>
                    </div>
                    {/* Abstract Background Shapes */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-800 transform skew-x-12 translate-x-32 hidden lg:block opacity-50"></div>
                </section>

                {/* Features Section */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-16">Why Choose FlexiZen?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 mx-auto">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 10.122l-4.908 4.908a7 7 0 009.816 0L12 10.122z"></path></svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Certified Instructors</h3>
                                <p className="text-gray-600">Our team consists of highly trained experts who prioritize your safety and progress.</p>
                            </div>
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6 mx-auto">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Flexible Schedules</h3>
                                <p className="text-gray-600">From early morning flow to evening meditation, we have classes that fit your busy life.</p>
                            </div>
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 mx-auto">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Modern Studio</h3>
                                <p className="text-gray-600">A peaceful environment equipped with everything you need for a perfect practice.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
