import React, { useState, useEffect } from 'react';
import { getAllEnquiries, markEnquiryAsRead, deleteEnquiry } from '../../api/enquiryApi';
import AdminLayout from '../../components/AdminLayout';

const ManageEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const res = await getAllEnquiries();
            setEnquiries(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkRead = async (id) => {
        await markEnquiryAsRead(id);
        fetchEnquiries();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this enquiry?")) {
            await deleteEnquiry(id);
            fetchEnquiries();
        }
    };

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Manage Enquiries</h2>

            {loading ? (
                <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {enquiries.length === 0 ? (
                        <div className="bg-white p-10 rounded-3xl text-center text-gray-500 border border-dashed">No enquiries yet.</div>
                    ) : (
                        enquiries.map((enq) => (
                            <div key={enq.id} className={`bg-white p-8 rounded-3xl shadow-sm border transition-all ${enq.isRead ? 'opacity-75 border-gray-100' : 'border-indigo-100 shadow-md ring-1 ring-indigo-50'}`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">{enq.name}</h3>
                                            {!enq.isRead && <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">New</span>}
                                        </div>
                                        <div className="text-sm text-gray-500 font-medium">{enq.email} • {new Date(enq.createdAt).toLocaleString()}</div>
                                    </div>
                                    <div className="flex space-x-4">
                                        {!enq.isRead && (
                                            <button onClick={() => handleMarkRead(enq.id)} className="text-indigo-600 hover:text-indigo-900 text-sm font-bold uppercase tracking-wider">Mark Read</button>
                                        )}
                                        <button onClick={() => handleDelete(enq.id)} className="text-red-600 hover:text-red-900 text-sm font-bold uppercase tracking-wider">Delete</button>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-2xl">
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-2">Subject: {enq.subject}</div>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{enq.message}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </AdminLayout>
    );
};

export default ManageEnquiries;
