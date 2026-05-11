import React, { useState, useEffect } from 'react';
import { getAdminProfile, updateAdminProfile, changeAdminPassword } from '../../api/adminApi';
import AdminLayout from '../../components/AdminLayout';

const Profile = () => {
    const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await getAdminProfile();
            setProfile(res.data);
        } catch (error) {
            console.error("Error fetching profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAdminProfile(profile);
            setMessage({ text: 'Profile updated successfully!', type: 'success' });
        } catch (error) {
            setMessage({ text: 'Failed to update profile', type: 'error' });
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setMessage({ text: 'Passwords do not match', type: 'error' });
            return;
        }
        try {
            await changeAdminPassword({ 
                oldPassword: passwords.oldPassword, 
                newPassword: passwords.newPassword 
            });
            setMessage({ text: 'Password changed successfully!', type: 'success' });
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Failed to change password', type: 'error' });
        }
    };

    if (loading) return <AdminLayout>Loading Profile...</AdminLayout>;

    return (
        <AdminLayout>
            {message.text && (
                <div className={`mb-6 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Information */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Profile Information</h3>
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" className="mt-1 block w-full border rounded-md p-2" required
                                value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" className="mt-1 block w-full border rounded-md p-2" required
                                value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="text" className="mt-1 block w-full border rounded-md p-2"
                                value={profile.phone || ''} onChange={e => setProfile({...profile, phone: e.target.value})} />
                        </div>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                            Update Profile
                        </button>
                    </form>
                </div>

                {/* Change Password */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Change Password</h3>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Old Password</label>
                            <input type="password" name="oldPassword" className="mt-1 block w-full border rounded-md p-2" required
                                value={passwords.oldPassword} onChange={e => setPasswords({...passwords, oldPassword: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input type="password" name="newPassword" className="mt-1 block w-full border rounded-md p-2" required
                                value={passwords.newPassword} onChange={e => setPasswords({...passwords, newPassword: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input type="password" name="confirmPassword" className="mt-1 block w-full border rounded-md p-2" required
                                value={passwords.confirmPassword} onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})} />
                        </div>
                        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Profile;
