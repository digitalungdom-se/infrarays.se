// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { ServerTokenResponse } from "types/tokens";

import { RootState } from "store";
import baseQuery from "fetchBaseQuery";
import { FileInfo } from "types/files";

export const fileApi = createApi({
  reducerPath: "fileApi",
  baseQuery,
  tagTypes: ["File"],
  endpoints: (builder) => ({
    getFiles: builder.query<FileInfo[], string | void>({
      query: (user = "@me") => ({
        url: `/application/${user}/file`,
      }),
    }),
  }),
});

export const { useGetFilesQuery } = fileApi;
