import axios from "axios";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: apiUrl
  });