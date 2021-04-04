import { Admin, NewAdmin } from "types/user";

import { Grading } from "types/grade";
import api from "./axios";

export const getAdmins = (): Promise<Admin[]> =>
  api.format.get<Admin[]>("/admin", { params: { skip: 0, limit: 10 } });

export const getGradesByApplicant = (applicantID: string): Promise<Grading[]> =>
  api.format.get<Grading[]>(`/application/${applicantID}/grade`);

export const addAdmin = (admin: NewAdmin): Promise<Admin> =>
  api.format.post<Admin>("/admin", admin);
