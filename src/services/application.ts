// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQuery from "fetchBaseQuery";

interface Application {
  finnish: boolean;
  birthdate: string;
}

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery,
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    getApplication: builder.query<Application, string>({
      query: (user = "@me") => ({
        url: `/application/${user}`,
      }),
      providesTags: () => [{ type: "Application", id: "@me" }],
    }),
  }),
});

export const { useGetApplicationQuery } = applicationApi;
