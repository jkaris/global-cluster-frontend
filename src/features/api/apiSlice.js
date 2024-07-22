import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosInstance } from '../../lib/axios';



// Custom fetchBaseQuery using axiosInstance
const customFetchBaseQuery = ({ baseUrl = '', url = '', method = 'GET', headers = {}, body }) => {
  return axiosInstance({
    method,
    url: `${baseUrl}${url}`,
    headers,
    data: body,
  }).then((response) => ({
    data: response.data,
  })).catch((error) => {
    if (error.response) {
      const { status, data } = error.response;
      return { error: { status, data } };
    } else if (error.request) {
      return { error: { status: 500, data: 'Network error' } };
    } else {
      return { error: { status: 500, data: error.message } };
    }
  });
};
// Custom fetchBaseQuery using axiosInstance same functionality as above customFetchBaseQuery but will be testested with actual API
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }


// Define a service using a base URL and expected endpoints
export const globalClusterApi = createApi({
  reducerPath: 'api',
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    // Define your endpoints here when they are ready
  }),
});
