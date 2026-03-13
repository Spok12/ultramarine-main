import axios from 'axios';

const $api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
});

$api.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('Request URL:', config.url);

    return config;
});

$api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._isRetry) {

            originalRequest._isRetry = true;

            try {

                const response = await axios.get(
                    'http://localhost:3000/api/auth/refresh',
                    { withCredentials: true }
                );

                localStorage.setItem('token', response.data.accessToken);

                return $api.request(originalRequest);

            } catch (e) {

                localStorage.removeItem('token');
                localStorage.removeItem('user');

                window.location.href = '/auth/login';
            }
        }

        throw error;
    }
);

export default $api;