// an instance of axios that is overridden to add more functionality to request and response

import axios, {AxiosResponse} from "axios";
import {getCookie} from "@/utils/authUtil";


const instance = axios.create();
instance.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST;
instance.defaults.timeout= 60000
instance.interceptors.request.use((request) => {

    // add the auth token to the headers before sending requests
    const token =  getCookie("authToken")
    if(token)
        setTokenHeader(token);
    return request
})

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    console.error("Bad request:", error.message);
                    break;
                case 401:
                    console.error("Unauthorized:", error.message);
                    break;
                case 403:
                    console.error("Forbidden:", error.message);
                    break;
                case 404:
                    console.error("Not found:", error.message);
                    break;
                case 500:
                    console.error("Server error:", error.message);
                    break;
                default:
                    console.error("Other error:", error.response.status, error.message);
            }
        } else {
            console.error("Network or Axios error:", error.message);
        }
        return Promise.reject(error.message);
    }
);

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common.Accept = 'application/json, text/plain, */*';
instance.defaults.headers.common['Accept-Language'] ='en-US,en;q=0.9,ar;q=0.8,en-GB;q=0.7,it;q=0.6';


export const setTokenHeader = (token: string): void => {

    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default instance;