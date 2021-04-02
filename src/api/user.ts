import api from "./axios";

/**
 * Delete account forever
 * @returns {Promise<void>}
 */
export const deleteAccount = (): Promise<void> =>
  api.format.delete("/user/@me");
