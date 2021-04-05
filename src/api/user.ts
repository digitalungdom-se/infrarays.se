import { User } from "types/user";
import api from "./axios";

/**
 * Delete user forever
 * @returns {Promise<void>}
 */
export const deleteUser = (): Promise<void> => api.format.delete("/user/@me");

export const getUser = (applicantID = "@me"): Promise<User> =>
  api.format.get(`/user/${applicantID}`);
