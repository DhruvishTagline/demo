import axios from "axios";
import { getCurrUserData } from "../utils/currentUser";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: { "access-token":getCurrUserData().token }
});