import axiosInstance from './axiosInstance';

const reportApi = {
    getBookingReport: (startDate, endDate) => {
        return axiosInstance.get('/admin/reports/bookings', { params: { startDate, endDate } });
    },
    getEnquiryReport: (startDate, endDate) => {
        return axiosInstance.get('/admin/reports/enquiries', { params: { startDate, endDate } });
    }
};

export default reportApi;
