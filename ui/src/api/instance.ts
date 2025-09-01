import axios from "axios";


const instance = axios.create();
instance.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST;
instance.interceptors.request.use((request) => {
    const token = localStorage.getItem('token');
    console.log(token)
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;

    return request
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ||
            error.message ||
            'Unexpected error occurred';
        console.error('API Error:', message);
        return Promise.reject(message);
    }
);

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common.Accept = 'application/json, text/plain, */*';
instance.defaults.headers.common['Accept-Language'] ='en-US,en;q=0.9,ar;q=0.8,en-GB;q=0.7,it;q=0.6';



export default instance;