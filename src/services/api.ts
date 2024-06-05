import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:5196/',
	timeout: 5000,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);  

export const api = instance;
