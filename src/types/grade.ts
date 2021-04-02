export type NumericalGradeField =
  | "cv"
  | "coverLetter"
  | "essays"
  | "grades"
  | "recommendations"
  | "overall";

export type Grades = Record<NumericalGradeField, number> & {
  comment: string;
};

export interface Grading extends Grades {
  applicantId: string;
  adminId: string;
  id: string;
}
