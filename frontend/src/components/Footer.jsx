import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="text-xl font-bold mb-4">FlexiZen Yoga</h3>
                        <p className="text-gray-400">Discover inner peace and strength through our curated yoga sessions. Your journey to wellness starts here.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/classes" className="hover:text-indigo-400">Yoga Classes</a></li>
                            <li><a href="/about" className="hover:text-indigo-400">About Us</a></li>
                            <li><a href="/contact" className="hover:text-indigo-400">Contact & Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <p className="text-gray-400 italic">123 Zen Garden Way, Serenity City</p>
                        <p className="text-gray-400 mt-2">Phone: (555) 010-8888</p>
                        <p className="text-gray-400">Email: hello@flexizen.yoga</p>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} FlexiZen Yoga Studio. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
