import { Admin, Applicant } from "./user";

export type GradingQuestionConfig = {
  id: string;
} & (
  | {
      type: "TEXT";
    }
  | {
      type: "RANGE";
      min: number;
      max: number;
    }
);

export type Application = Applicant &
  Partial<ApplicationGrade> & {
    city: string;
    school: string;
    done?: boolean;
  };

export type NumericalGradeField =
  | "cv"
  | "coverLetter"
  | "essays"
  | "grades"
  | "recommendations"
  | "overall";

export type ApplicationGrade = {
  comment: string;
  cv: number;
  coverLetter: number;
  essays: number;
  grades: number;
  recommendations: number;
  overall: number;
};

export interface IndividualGrading extends ApplicationGrade {
  applicantId: string;
  adminId: string;
  id: string;
}

export type IndividualGradingWithName = ApplicationGrade &
  Pick<Admin, "firstName" | "lastName">;

export type GradedApplication = ApplicationGrade & Application;

export interface TopOrderItem {
  applicantId: string;
  score: number;
}

export interface OrderItem {
  id: string;
  adminId: string;
  applicantId: string;
  gradingOrder: number;
  done: boolean;
}
