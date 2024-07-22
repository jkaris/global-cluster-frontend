import axios from "axios";
import { BASE_URL } from "./constants";

// Axios instance with base URL
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" }
  });

// Request interceptor to add authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = ""; // Replace with your actual access token retrieval logic
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh on 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401 error)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = "" // Replace with your actual refresh token retrieval logic

        // Use your refresh token logic to get a new access token
        const response = await axios.post('/auth/refresh', {
          refresh_token: refreshToken,
        });

        const newAccessToken = response.data.access_token;

        // Update access token in the auth state
        // dispatch(setAccessToken(newAccessToken)); // Replace with your actual action to update access token

        // Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        // Handle refresh token failure (e.g., redirect to login page)
        console.error('Failed to refresh token:', error);
        // navigate('/login'); // Replace with your actual navigation logic
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

  