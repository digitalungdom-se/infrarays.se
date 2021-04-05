export type User = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  created: string;
  verified: boolean;
};

export interface Applicant extends User {
  birthdate: string;
  finnish: boolean;
  type: "APPLICANT";
}

export type ServerUserFields = "id" | "created" | "verified";

export type NewAdmin = Omit<Admin, ServerUserFields>;

export interface Admin extends User {
  type: "ADMIN" | "SUPER_ADMIN";
}