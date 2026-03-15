import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FIREBASE_DB_URL } from "../Firebase/database.js";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: FIREBASE_DB_URL }),
  tagTypes: ["ProfileImage"],
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
  }),
});

export const {
  useSaveUserMutation,
  useGetUserByIdQuery,
  usePutProfileImageMutation,
  useGetProfileImageQuery,
} = userApi;
