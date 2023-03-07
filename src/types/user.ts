export type User = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  created: string;
  verified: boolean;
  type: UserTypes;
};

export type UserTypes = Applicant["type"] & Admin["type"];

export interface Applicant extends Omit<User, "type"> {
  birthdate: string;
  finnish: boolean;
  type: "APPLICANT";
}

export type ServerUserFields = "id" | "created" | "verified";

export type NewAdmin = Omit<Admin, ServerUserFields>;

export interface Admin extends Omit<User, "type"> {
  type: "ADMIN" | "SUPER_ADMIN";
}
