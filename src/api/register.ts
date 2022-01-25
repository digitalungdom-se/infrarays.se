import { Applicant } from "types/user";
import api from "./axios";

/**
 * Required values in a registration form for an applicant
 */
export type RegistrationForm = Pick<
  Applicant,
  "firstName" | "lastName" | "birthdate" | "email" | "finnish"
>;

/**
 * Register an application
 * @param {RegistrationForm} form values to register with
 */
export const register = (form: RegistrationForm): Promise<Applicant> =>
  api.format.post<Applicant>("application", form);
