import formatErrors, { FormattedErrors } from "utils/formatErrors";

import { DEV_API_BASE_URL } from "./constants";
import api from "./axios";

/**
 * Sends login code to your email
 * @param {email}
 * @returns {Promise<null | string>} returns either nothing or the login code
 */
const sendLoginCode = (email: string): Promise<string | null> =>
  api.format.post<null | string>("/user/send_email_login_code", {
    email,
  });

/**
 * Required parameters for send login code request
 */
type SendLoginCodeParams = {
  email: string; // the email which you signed up with
};

/**
 * Sends login code to your email and displays it in a notification if it is run on the dev api
 * @param email
 * @returns the string or formatted errors
 */
export const sendLoginCodeAndShowCode = (
  email: string
): Promise<string | void | FormattedErrors<SendLoginCodeParams>> =>
  api
    .post<string | void>("/user/send_email_login_code", { email })
    .then((res) => {
      if (res.data && res.config.baseURL === DEV_API_BASE_URL) return res.data;
      return;
    })
    .catch((err) => {
      throw formatErrors(err);
    });

export default sendLoginCode;
