import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:5050/api/v1";
const axiosClient = axios.create({ baseURL: BASE_URL });

// Get token from LocalStorage
const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (e) {
    console.error(e);
    return null;
  }
};

// Request interceptors
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    const myConfig = config;
    if (token) myConfig.headers.authorization = `Bearer ${token}`;

    return myConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptors
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
