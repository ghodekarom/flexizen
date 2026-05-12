import React, { useState } from 'react';
import reportApi from '../../api/reportApi';

const Reports = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportType, setReportType] = useState('bookings');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchReport = async (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            setError('Please select both start and end dates');
            return;
        }
        setLoading(true);
        setError('');
        try {
            let response;
            if (reportType === 'bookings') {
                response = await reportApi.getBookingReport(startDate, endDate);
            } else {
                response = await reportApi.getEnquiryReport(startDate, endDate);
            }
            setData(response.data.data);
        } catch (err) {
            setError('Failed to fetch report. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">System Reports</h1>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                <form onSubmit={handleFetchReport} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Report Type</label>
                        <select 
                            value={reportType} 
                            onChange={(e) => setReportType(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                        >
                            <option value="bookings">Bookings Report</option>
                            <option value="enquiries">Enquiries Report</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Start Date</label>
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">End Date</label>
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-0.5 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Generating...' : 'Generate Report'}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>}
            </div>

            {data.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-fadeIn">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                    <th className="px-6 py-4 font-bold">Date</th>
                                    {reportType === 'bookings' ? (
                                        <>
                                            <th className="px-6 py-4 font-bold">Booking #</th>
                                            <th className="px-6 py-4 font-bold">Name</th>
                                            <th className="px-6 py-4 font-bold">Status</th>
                                        </>
                                    ) : (
                                        <>
                                            <th className="px-6 py-4 font-bold">Name</th>
                                            <th className="px-6 py-4 font-bold">Email</th>
                                            <th className="px-6 py-4 font-bold">Message</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        {reportType === 'bookings' ? (
                                            <>
                                                <td className="px-6 py-4 text-sm font-mono font-semibold text-indigo-600">
                                                    {item.bookingNumber}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800">{item.userName}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                        item.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                                        item.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">{item.message}</td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : !loading && (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Report Generated</h3>
                    <p className="text-gray-500">Select report type and date range to view data.</p>
                </div>
            )}
        </div>
    );
};

export default Reports;
