import React, { useState, useEffect } from 'react';
import { getPublicPage } from '../api/publicApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await getPublicPage('ABOUT');
                setContent(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAbout();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10">{content?.title || 'About FlexiZen'}</h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                        {content ? (
                            <div dangerouslySetInnerHTML={{ __html: content.content }} />
                        ) : (
                            <p>Loading serenity...</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;
