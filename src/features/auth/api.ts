import { authorizeWithEmailAndCode, authorizeWithToken } from "api/auth";

import { ServerTokenResponse } from "types/tokens";
import { TokenStorage } from "utils/tokenInterceptor";

export const loginWithCode = (
  email: string,
  code: string
): Promise<ServerTokenResponse> =>
  authorizeWithEmailAndCode(email, code).then((res) => {
    TokenStorage.storeTokens(res);
    return res;
  });

export const loginWithToken = (token: string): Promise<ServerTokenResponse> =>
  authorizeWithToken(token).then((res) => {
    TokenStorage.storeTokens(res);
    return res;
  });
