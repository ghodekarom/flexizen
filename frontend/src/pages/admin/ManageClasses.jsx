import React, { useState, useEffect } from 'react';
import { getAllClasses, createClass, updateClass, deleteClass } from '../../api/classApi';
import AdminLayout from '../../components/AdminLayout';

const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [formData, setFormData] = useState({
        name: '', description: '', durationMinutes: 60, schedule: '', capacity: 20, fee: 0
    });

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const res = await getAllClasses();
            setClasses(res.data);
        } catch (error) {
            console.error("Error fetching classes", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (cls) => {
        setEditingClass(cls);
        setFormData({ ...cls });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this class?")) {
            await deleteClass(id);
            fetchClasses();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingClass) {
                await updateClass(editingClass.id, formData);
            } else {
                await createClass(formData);
            }
            setShowModal(false);
            setEditingClass(null);
            setFormData({ name: '', description: '', durationMinutes: 60, schedule: '', capacity: 20, fee: 0 });
            fetchClasses();
        } catch (error) {
            console.error("Error saving class", error);
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Classes</h2>
                <button 
                    onClick={() => { setEditingClass(null); setShowModal(true); }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Add Class
                </button>
            </div>

            {loading ? (
                <div>Loading classes...</div>
            ) : (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Schedule</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {classes.map((cls) => (
                                <tr key={cls.id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">{cls.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.schedule}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cls.fee}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.capacity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(cls)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                        <button onClick={() => handleDelete(cls.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
                        <h3 className="text-lg font-bold mb-4">{editingClass ? 'Edit Class' : 'Add New Class'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" className="mt-1 block w-full border rounded-md p-2" required
                                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Schedule</label>
                                <input type="text" className="mt-1 block w-full border rounded-md p-2" required placeholder="e.g. Mon & Wed, 8AM"
                                    value={formData.schedule} onChange={e => setFormData({...formData, schedule: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Duration (min)</label>
                                    <input type="number" className="mt-1 block w-full border rounded-md p-2" required
                                        value={formData.durationMinutes} onChange={e => setFormData({...formData, durationMinutes: parseInt(e.target.value)})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fee ($)</label>
                                    <input type="number" step="0.01" className="mt-1 block w-full border rounded-md p-2" required
                                        value={formData.fee} onChange={e => setFormData({...formData, fee: parseFloat(e.target.value)})} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                                <input type="number" className="mt-1 block w-full border rounded-md p-2" required
                                    value={formData.capacity} onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea className="mt-1 block w-full border rounded-md p-2" rows="3"
                                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save Class</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ManageClasses;
