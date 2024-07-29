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

    const accessToken = lc_storage_obj?.access.replace('"', "");

    // Check if the URL matches the specified patterns and the method is POST
    const shouldExclude =
      (config.url.includes("/accounts/individuals/") ||
        config.url.includes("/accounts/companies/")) &&
      config.method === "POST";

    if (accessToken && !shouldExclude) {
      const authorizationBearer = `Bearer ${accessToken}`.replace('"', "");
      config.headers.Authorization = authorizationBearer;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
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

        const refreshToken = lc_storage_obj?.refresh.replace('"', "");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Use refresh token logic to get a new access token
        const response = await axios.post(
          `${BASE_URL}/api/v1/accounts/token/refresh/`,
          {
            refresh: refreshToken.replace('"', ""),
          },
        );

        // console.log(JSON.stringify(response.data) + "-------------Refresh Token--------------");
        const newAccessToken = response.data.access;

        // Update access token in localStorage
        lc_storage_obj.access = newAccessToken;
        localStorage.setItem(
          `persist:${WEBSITE_NAME}:auth`,
          JSON.stringify(lc_storage_obj),
        );

        // Retry original request with new access token
        const authorizationBearer = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = authorizationBearer;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // window.location.href = "/login"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export const nigeriaStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];
