import { globalClusterApi } from "../api/apiSlice";

export const TicketApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    tickets: builder.mutation({
      query: () => ({
        url: "/api/v1/support-tickets/",
        method: "GET",
      }),
    }),
    addTicket: builder.mutation({
      query: (ticket) => ({
        url: "/api/v1/support-tickets/",
        method: "POST",
        body:ticket,
        headers: {
          'Content-Type': 'multipart/form-data', // This should be omitted as the browser will set it correctly
        },
      }),
    }),
  }),
});

export const { useTicketsMutation,useAddTicketMutation }  = TicketApiSlice


