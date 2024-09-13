import axios from "axios";
import { getCurrUserData } from "../utils/currentUser";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
    config => {     
        const token = getCurrUserData().token; 
        if (token) {
            config.headers["access-token"] = token;
        }      
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
