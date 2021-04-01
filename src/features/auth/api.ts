import { ServerTokenResponse, TokenStorage } from "utils/tokenInterceptor";

import Axios from "api/axios";
import { AxiosResponse } from "axios";

export const loginWithCode = (
  email: string,
  loginCode: string
): Promise<AxiosResponse<ServerTokenResponse>> =>
  Axios.post<ServerTokenResponse>(
    "/user/oauth/token",
    {
      grant_type: "client_credentials",
    },
    {
      headers: { Authorization: `Email ${btoa(email + ":" + loginCode)}` },
    }
  ).then((res) => {
    TokenStorage.storeTokens(res.data);
    return res;
  });

export const loginWithToken = (
  token: string
): Promise<AxiosResponse<ServerTokenResponse>> =>
  Axios.post<ServerTokenResponse>(
    "/user/oauth/token",
    {
      grant_type: "client_credentials",
    },
    {
      headers: { Authorization: `Email ${token}` },
    }
  ).then((res) => {
    TokenStorage.storeTokens(res.data);
    return res;
  });
