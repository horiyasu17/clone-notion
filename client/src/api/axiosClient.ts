import axios, { InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:5050/api/v1";
const axiosClient = axios.create({ baseURL: BASE_URL });

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
  (config: any) => {
    const token = getToken();
    const authHeaders = token
      ? { authorization: `Bearer ${token}` }
      : undefined;

    return {
      ...config,
      headers: {
        ...config.headers,
        ...authHeaders,
        "Content-Type": "application/json",
      },
    };
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
