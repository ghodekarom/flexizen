import axiosInstance from './axiosInstance';

export const getPublicClasses = async () => {
    const response = await axiosInstance.get('/public/classes');
    return response.data;
};

export const getPublicClassDetails = async (id) => {
    const response = await axiosInstance.get(`/public/classes/${id}`);
    return response.data;
};

export const getPublicPage = async (type) => {
    const response = await axiosInstance.get(`/public/pages/${type}`);
    return response.data;
};

export const submitPublicBooking = async (bookingData) => {
    const response = await axiosInstance.post('/public/bookings', bookingData);
    return response.data;
};

export const submitPublicEnquiry = async (enquiryData) => {
    const response = await axiosInstance.post('/public/enquiries', enquiryData);
    return response.data;
};
