export type NumericalGradeField =
  | "cv"
  | "coverLetter"
  | "essays"
  | "grades"
  | "recommendations"
  | "overall";

export type ApplicationGrade = Record<NumericalGradeField, number> & {
  comment: string;
};

export interface Grading extends ApplicationGrade {
  applicantId: string;
  adminId: string;
  id: string;
}
