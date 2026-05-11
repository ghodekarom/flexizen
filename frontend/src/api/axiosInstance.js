import axios from 'axios';

// Create an Axios instance with credentials enabled.
// This ensures that the JSESSIONID cookie is sent with every request,
// which is required for Spring Security session-based auth.
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Tomcat default port
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;
