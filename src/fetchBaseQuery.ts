import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { RootState } from "./store";
import { Mutex } from "async-mutex";
import { authFail, authSuccess } from "features/auth/authSlice";
import { ServerTokenResponse } from "types/tokens";

const baseUrl =
  process.env.REACT_APP_API_URL || "https://devapi.infrarays.digitalungdom.se";
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token?.access_token;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result;
  const token = (api.getState() as RootState).auth.token;
  if (token && token.refreshTime + token.expires * 1000 - Date.now() < 0) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: "/user/oauth/token",
            method: "POST",
            body: {
              refresh_token: token?.refresh_token,
              grant_type: "refresh_token",
            },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(authSuccess(refreshResult.data as ServerTokenResponse));
        } else {
          api.dispatch(authFail());
        }
      } finally {
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
      return result;
    }
  }
  result = await baseQuery(args, api, extraOptions);

  return result;
};

export default baseQueryWithReauth;
