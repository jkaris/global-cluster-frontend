import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosInstance } from "../../lib/axios";

// Custom fetchBaseQuery using axiosInstance
/**
 * Makes a custom fetch request using axios with the provided parameters.
 * @param {Object} options - An object containing the request options.
 * @param {string} [options.baseUrl=''] - The base URL for the request.
 * @param {string} [options.url=''] - The URL for the request.
 * @param {string} [options.method='GET'] - The HTTP method for the request.
 * @param {Object} [options.headers={}] - The headers for the request.
 * @param {Object} options.body - The body of the request.
 * @returns {Promise} A promise that resolves to an object with the response data or an error object.
 */
const customFetchBaseQuery = ({
  baseUrl = "",
  url = "",
  method = "GET",
  headers = {},
  body,
}) => {
  return axiosInstance({
    method,
    url: `${baseUrl}${url}`,
    headers,
    data: body,
  })
    .then((response) => ({
      data: response.data,
    }))
    .catch((error) => {
      if (error.response) {
        const { status, data } = error.response;
        return { error: { status, data } };
      } else if (error.request) {
        return { error: { status: 500, data: "Network error" } };
      } else {
        return { error: { status: 500, data: error.message } };
      }
    });
};
// Custom fetchBaseQuery using axiosInstance same functionality as above customFetchBaseQuery but will be testested with actual API
/**
 * Creates a base axios query function with a specified base URL.
 * @param {Object} { baseUrl } - The base URL for the axios query.
 * @returns {Function} An async function that takes in parameters for the query and returns a promise.
 */
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// Define a service using a base URL and expected endpoints
/**
 * Creates a global cluster API using the given configuration.
 * @param {Object} config - The configuration object for creating the API.
 * @param {string} config.reducerPath - The path for the reducer.
 * @param {Function} config.baseQuery - The base query function for the API.
 * @param {Function} config.endpoints - The endpoints configuration function.
 * @returns The global cluster API.
 */
export const globalClusterApi = createApi({
  reducerPath: "api",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    // Define your endpoints here when they are ready
  }),
});
