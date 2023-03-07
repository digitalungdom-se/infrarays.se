// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { ServerTokenResponse } from "types/tokens";

import { RootState } from "store";
import baseQuery from "fetchBaseQuery";
import { User } from "types/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<User, string | void>({
      query: (user = "@me") => ({
        url: `/user/${user}`,
      }),
      providesTags: (user) => [
        { type: "User", id: "@me" },
        { type: "User", id: user?.id },
      ],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
