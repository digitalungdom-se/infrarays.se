// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { ServerTokenResponse } from "types/tokens";
import { authSuccess } from "features/auth/authSlice";
import { userApi } from "./user";

import { RootState } from "store";
import baseQuery from "fetchBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    sendLoginCode: builder.mutation<string, string>({
      query: (email) => ({
        url: "/user/send_email_login_code",
        method: "POST",
        body: { email },
      }),
    }),
    loginWithToken: builder.mutation<ServerTokenResponse, string>({
      query: (token) => ({
        url: "/user/oauth/token",
        method: "POST",
        body: {
          grant_type: "client_credentials",
        },
        headers: {
          Authorization: `Email ${token}`,
        },
      }),
    }),
    loginWithEmailAndCode: builder.mutation<
      ServerTokenResponse,
      { email: string; code: string }
    >({
      query: ({ email, code }) => ({
        url: "/user/oauth/token",
        method: "POST",
        body: {
          grant_type: "client_credentials",
        },
        headers: {
          Authorization: `Email ${btoa(email + ":" + code)}`,
        },
      }),
    }),
    revoke: builder.mutation<null, void>({
      query: () => ({
        url: "/user/oauth/revoke",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginWithTokenMutation,
  useLoginWithEmailAndCodeMutation,
  useSendLoginCodeMutation,
  useRevokeMutation,
} = authApi;
