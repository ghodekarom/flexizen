import axiosInstance from './axiosInstance';

export const getAllBookings = async (status = '') => {
    const url = status ? `/admin/bookings?status=${status}` : '/admin/bookings';
    const response = await axiosInstance.get(url);
    return response.data;
};

export const searchBookingByNumber = async (bookingNumber) => {
    const response = await axiosInstance.get(`/admin/bookings/search/${bookingNumber}`);
    return response.data;
};

export const updateBookingStatus = async (id, status) => {
    const response = await axiosInstance.put(`/admin/bookings/${id}/status?status=${status}`);
    return response.data;
};
