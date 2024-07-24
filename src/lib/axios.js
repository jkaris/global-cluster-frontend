import axios from "axios";
import { BASE_URL, WEBSITE_NAME } from "./constants";

// Create an Axios instance with base URL and default headers
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to add authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const lc_storage = localStorage.getItem(`persist:${WEBSITE_NAME}:auth`);
    const lc_storage_obj = JSON.parse(lc_storage || "{}"); // Safely parse localStorage

    const accessToken = lc_storage_obj?.access;
    if (accessToken &&  !config.url.includes("/login") && !config.url.includes("/register")) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh on 401 errors, excluding login URL
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401 error), excluding login URL
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/login")
    ) {
      originalRequest._retry = true;

      try {
        const lc_storage = localStorage.getItem(`persist:${WEBSITE_NAME}:auth`);
        const lc_storage_obj = JSON.parse(lc_storage || "{}"); // Safely parse localStorage

        const refreshToken = lc_storage_obj?.refresh;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Use refresh token logic to get a new access token
        const response = await axios.post("/auth/refresh", {
          refresh_token: refreshToken,
        });

        const newAccessToken = response.data.access_token;

        // Update access token in localStorage
        lc_storage_obj.access = newAccessToken;
        localStorage.setItem(
          `persist:${WEBSITE_NAME}:auth`,
          JSON.stringify(lc_storage_obj)
        );

        // Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        window.location.href = "/login"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
