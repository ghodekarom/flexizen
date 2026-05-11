import axiosInstance from './axiosInstance';

export const loginAdmin = async (username, password) => {
    const response = await axiosInstance.post('/auth/login', { username, password });
    return response.data;
};

export const logoutAdmin = async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
};

export const checkSession = async () => {
    const response = await axiosInstance.get('/auth/session');
    return response.data;
};
