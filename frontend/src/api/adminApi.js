import axiosInstance from './axiosInstance';

export const getAdminProfile = async () => {
    const response = await axiosInstance.get('/admin/profile');
    return response.data;
};

export const updateAdminProfile = async (profileData) => {
    const response = await axiosInstance.put('/admin/profile', profileData);
    return response.data;
};

export const changeAdminPassword = async (passwords) => {
    const response = await axiosInstance.put('/admin/change-password', passwords);
    return response.data;
};

export const getDashboardStats = async () => {
    const response = await axiosInstance.get('/admin/dashboard');
    return response.data;
};
