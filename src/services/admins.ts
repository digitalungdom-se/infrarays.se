// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQuery from "fetchBaseQuery";
import { OrderItem } from "types/grade";
import { Admin } from "types/user";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery,
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getAdmins: builder.query<
      Admin[],
      {
        skip?: number;
        limit?: number;
      }
    >({
      query: ({ skip = 0, limit = 100 }) => ({
        url: "/admin",
        params: {
          skip,
          limit,
        },
      }),
      providesTags: () => [{ type: "Admin", id: "LIST" }],
    }),
    addAdmin: builder.mutation<
      Admin,
      Pick<Admin, "email" | "firstName" | "lastName" | "type">
    >({
      query: (admin) => ({
        url: "/admin",
        method: "POST",
        body: admin,
      }),
      invalidatesTags: () => [{ type: "Admin", id: "LIST" }],
    }),
    getGradingOrder: builder.query<OrderItem[], void>({
      query: () => ({
        url: "/admin/grading",
      }),
    }),
    randomiseOrder: builder.mutation<OrderItem[], void>({
      query: () => ({
        url: "/admin/grading/randomise",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useAddAdminMutation,
  useGetGradingOrderQuery,
  useRandomiseOrderMutation,
} = adminApi;
