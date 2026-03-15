import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FIREBASE_DB_URL } from "../Firebase/database.js";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: FIREBASE_DB_URL }),
  tagTypes: ["ProfileImage", "Addresses"],
  endpoints: (builder) => ({
    saveUser: builder.mutation({
      query: ({ localId, ...userData }) => ({
        url: `users/${localId}.json`,
        method: "PUT",
        body: userData,
      }),
    }),
    getUserById: builder.query({
      query: (localId) => ({
        url: `users/${localId}.json`,
        method: "GET",
      }),
    }),
    putProfileImage: builder.mutation({
      query: ({ localId, image }) => ({
        url: `users/${localId}/profileImage.json`,
        method: "PUT",
        body: { image },
      }),
      invalidatesTags: ["ProfileImage"],
    }),
    getProfileImage: builder.query({
      query: (localId) => ({
        url: `users/${localId}/profileImage.json`,
        method: "GET",
      }),
      providesTags: ["ProfileImage"],
    }),
    saveAddress: builder.mutation({
      query: ({ localId, address }) => ({
        url: `users/${localId}/addresses.json`,
        method: "POST",
        body: address,
      }),
      transformResponse: (response, meta, arg) => ({
        id: response.name,
        ...arg.address,
      }),
      invalidatesTags: ["Addresses"],
    }),
    getAddresses: builder.query({
      query: (localId) => ({
        url: `users/${localId}/addresses.json`,
        method: "GET",
      }),
      providesTags: ["Addresses"],
    }),
    updateAddress: builder.mutation({
      query: ({ localId, addressId, address }) => ({
        url: `users/${localId}/addresses/${addressId}.json`,
        method: "PUT",
        body: address,
      }),
      invalidatesTags: ["Addresses"],
    }),
    deleteAddress: builder.mutation({
      query: ({ localId, addressId }) => ({
        url: `users/${localId}/addresses/${addressId}.json`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addresses"],
    }),
  }),
});

export const {
  useSaveUserMutation,
  useGetUserByIdQuery,
  usePutProfileImageMutation,
  useGetProfileImageQuery,
  useSaveAddressMutation,
  useGetAddressesQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = userApi;
