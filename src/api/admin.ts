import { Admin, NewAdmin } from "types/user";
import {
  Application,
  ApplicationGrade,
  GradedApplication,
  IndividualGrading,
  OrderItem,
} from "types/grade";

import api from "./axios";

export const getAdmins = (): Promise<Admin[]> =>
  api.format.get<Admin[]>("/admin", { params: { skip: 0, limit: 10 } });

export const getGradesConfig = (applicantID: string): string =>
  `/application/${applicantID}/grade`;

export const getGradesByApplicant = (
  applicantID: string
): Promise<IndividualGrading[]> =>
  api.format.get<IndividualGrading[]>(getGradesConfig(applicantID));

export const getApplications = (): Promise<
  (Application | GradedApplication)[]
> => api.format.get<Application[]>("/application");

export const getGradingOrder = (): Promise<OrderItem[]> =>
  api.format.get<OrderItem[]>("/admin/grading");

export const postApplicationGrade = (
  applicantID: string,
  form: ApplicationGrade
): Promise<IndividualGrading> =>
  api.format.post<IndividualGrading>(`/application/${applicantID}/grade`, form);

export const addAdmin = (admin: NewAdmin): Promise<Admin> =>
  api.format.post<Admin>("/admin", admin);

/**
 * Admins can randomise the order they view applications in,
 * to decrease bias in the grading process
 * @returns order of applicants
 */
export const randomiseOrder = (): Promise<OrderItem[]> =>
  api.format.post<OrderItem[]>("/admin/grading/randomise");
