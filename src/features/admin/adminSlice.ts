/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Grade from "./Grading/Grade";
import { RootState } from "store";

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

type NumericalGradeField =
  | "cv"
  | "coverLetter"
  | "essays"
  | "grades"
  | "recommendations"
  | "overall";

export type GradeFormValues = Record<NumericalGradeField, number> & {
  comment: string;
};

type GradingField =
  | "cv"
  | "coverLetter"
  | "grades"
  | "recommendations"
  | "overall";

interface ApplicationBaseInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  finnish: boolean;
  birthdate: string;
  city: string;
  school: string;
}

export type ApplicationInfo = Partial<GradeFormValues> & ApplicationBaseInfo;

interface AdminInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: "SUPER_ADMIN" | "ADMIN";
  verified: boolean;
  created: string;
}

export interface Grading extends GradeFormValues {
  applicantId: string;
  adminId: string;
  id: string;
}

interface AdminState {
  gradingOrder: OrderItem[];
  topOrder: TopOrderItem[];
  applications: Record<string, ApplicationInfo>;
  admins: Record<string, AdminInfo>;
  grades: Record<string, Grading[]>;
}

export const initialState: AdminState = {
  gradingOrder: [],
  topOrder: [],
  applications: {},
  admins: {},
  grades: {},
};

const adminSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setApplications(state, action: PayloadAction<ApplicationBaseInfo[]>) {
      action.payload.forEach(
        (applicant) => (state.applications[applicant.id] = applicant)
      );
      const topOrder: TopOrderItem[] = Object.keys(state.applications)
        .map((applicantId) => {
          const application = state.applications[
            applicantId
          ] as ApplicationInfo;
          let score = 0;
          if (application?.cv) {
            score =
              (application?.cv as number) +
              (application?.coverLetter as number) +
              (application?.grades as number) +
              (application?.recommendations as number) +
              (application?.overall as number);
          }
          return { applicantId, score };
        })
        .sort((a, b) => b.score - a.score);
      state.topOrder = topOrder;
    },
    setAdmins(state, action: PayloadAction<AdminInfo[]>) {
      action.payload.forEach((admin) => {
        state.admins[admin.id] = admin;
      });
    },
    updateGradingOrder(state, action: PayloadAction<OrderItem[]>) {
      state.gradingOrder = action.payload;
    },
    setGrades(
      state,
      action: PayloadAction<{ grades: Grading[]; applicantId: string }>
    ) {
      state.grades[action.payload.applicantId] = action.payload.grades;
    },
    setMyGrade(state, action: PayloadAction<Grading>) {
      const gradeIndex = state.grades[action.payload.applicantId].findIndex(
        (grade) => grade.adminId === action.payload.adminId
      );
      state.grades[action.payload.applicantId][gradeIndex] = action.payload;
    },
  },
});

export const selectGradingOrder = (state: RootState): OrderItem[] =>
  state.admin.gradingOrder;

export const selectAdmins = (state: RootState): AdminInfo[] =>
  Object.keys(state.admin.admins).map((adminID) => state.admin.admins[adminID]);

export const selectApplicationsByTop = (state: RootState): ApplicationInfo[] =>
  state.admin.topOrder.map(
    (orderItem) => state.admin.applications[orderItem.applicantId]
  );

interface GradingData extends GradeFormValues {
  firstName: string;
  lastName: string;
}

export const selectGradesByApplicant = (userID: string) => (
  state: RootState
): GradingData[] | undefined =>
  state.admin.grades[userID]?.map((grade) => ({
    ...grade,
    firstName: state.admin.admins[grade.adminId]?.firstName,
    lastName: state.admin.admins[grade.adminId]?.lastName,
  }));

export const selectMyGrading = (
  state: RootState,
  id: string
): GradingData | undefined => {
  const relevantGrades = state.admin.grades[id];
  if (relevantGrades) {
    const myGrading = relevantGrades.find(
      (grading) => grading.adminId === state.auth.user?.id
    );
    if (myGrading)
      return {
        firstName: state.admin.applications[myGrading.applicantId].firstName,
        lastName: state.admin.applications[myGrading.applicantId].lastName,
        cv: myGrading?.cv,
        coverLetter: myGrading?.coverLetter,
        essays: myGrading?.essays,
        grades: myGrading?.grades,
        recommendations: myGrading?.recommendations,
        overall: myGrading?.overall,
        comment: myGrading?.comment,
      };
    return undefined;
  }
  return undefined;
};

export const selectApplicationsByGradingOrder = (
  state: RootState
): ApplicationInfo[] =>
  state.admin.gradingOrder
    .map((orderItem) => ({
      ...state.admin.applications[orderItem.applicantId],
      done: state.admin.grades[orderItem.applicantId]
        ? state.admin.grades[orderItem.applicantId].findIndex(
            (grade) => grade.adminId === state.auth.user?.id
          ) !== -1
        : false,
    }))
    .filter((val) => val);

export const {
  updateGradingOrder,
  setApplications,
  setAdmins,
  setGrades,
  setMyGrade,
} = adminSlice.actions;

export default adminSlice.reducer;
