import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FIREBASE_DB_URL } from "../Firebase/database.js";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: FIREBASE_DB_URL }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    saveOrder: builder.mutation({
      query: ({ localId, order }) => ({
        url: `orders/${localId}.json`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrders: builder.query({
      query: (localId) => ({
        url: `orders/${localId}.json`,
        method: "GET",
      }),
      providesTags: ["Orders"],
      transformResponse: (response) => {
        if (!response) return [];
        return Object.entries(response).map(([id, order]) => ({
          id,
          ...order,
        }));
      },
    }),
  }),
});

export const { useSaveOrderMutation, useGetOrdersQuery } = orderApi;
