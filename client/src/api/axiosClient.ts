import axios, { InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:5050/api/v 1";
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// Request interceptors
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
    // return {
    //   config,
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: `Bearer ${getToken()}`,
    //   },
    // };
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptors
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
