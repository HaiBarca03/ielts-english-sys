import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

// 🛠️ Lấy token từ localStorage (hoặc Redux store)
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    if (response.data && response.data.data) return response.data;
    return response;
}, (error) => {
    if (error.response && error.response.data) return error.response.data;
    return Promise.reject(error);
});

export default instance;