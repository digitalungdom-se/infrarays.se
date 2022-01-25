import { ServerTokenResponse } from "types/tokens";
import api from "./axios";

export const authorizeWithEmailAndCode = (
  email: string,
  code: string
): Promise<ServerTokenResponse> =>
  api.format.post<ServerTokenResponse>(
    "/user/oauth/token",
    {
      grant_type: "client_credentials",
    },
    {
      headers: { Authorization: `Email ${btoa(email + ":" + code)}` },
    }
  );

export const authorizeWithToken = (
  token: string
): Promise<ServerTokenResponse> =>
  api.format.post<ServerTokenResponse>(
    "/user/oauth/token",
    {
      grant_type: "client_credentials",
    },
    {
      headers: { Authorization: `Email ${token}` },
    }
  );
