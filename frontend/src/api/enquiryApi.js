import axiosInstance from './axiosInstance';

export const getAllEnquiries = async () => {
    const response = await axiosInstance.get('/admin/enquiries');
    return response.data;
};

export const markEnquiryAsRead = async (id) => {
    const response = await axiosInstance.put(`/admin/enquiries/${id}/read`);
    return response.data;
};

export const deleteEnquiry = async (id) => {
    const response = await axiosInstance.delete(`/admin/enquiries/${id}`);
    return response.data;
};
