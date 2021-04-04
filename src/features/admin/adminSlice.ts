import {
  Application,
  GradedApplication,
  IndividualGrading,
  IndividualGradingWithName,
  OrderItem,
  TopOrderItem,
} from "types/grade";
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Admin } from "types/user";
import { RootState } from "store";

interface AdminState {
  gradingOrder: OrderItem[];
  topOrder: TopOrderItem[];
  applications: Record<string, GradedApplication | Application>;
  admins: Record<string, Admin>;
  grades: Record<string, IndividualGrading[]>;
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
    setApplications(
      state,
      action: PayloadAction<(GradedApplication | Application)[]>
    ) {
      action.payload.forEach(
        (applicant) => (state.applications[applicant.id] = applicant)
      );
      const topOrder: TopOrderItem[] = Object.keys(state.applications)
        .map((applicantId) => {
          const application = state.applications[
            applicantId
          ] as GradedApplication;
          let score = 0;
          if (application.cv !== undefined) {
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
    setAdmins(state, action: PayloadAction<Admin[]>) {
      action.payload.forEach((admin) => {
        state.admins[admin.id] = admin;
      });
    },
    updateGradingOrder(state, action: PayloadAction<OrderItem[]>) {
      state.gradingOrder = action.payload;
    },
    setGrades(
      state,
      action: PayloadAction<{
        grades: IndividualGrading[];
        applicantId: string;
      }>
    ) {
      state.grades[action.payload.applicantId] = action.payload.grades;
    },
    setMyGrade(state, action: PayloadAction<IndividualGrading>) {
      const gradeIndex = state.grades[action.payload.applicantId].findIndex(
        (grade) => grade.adminId === action.payload.adminId
      );
      state.grades[action.payload.applicantId][gradeIndex] = action.payload;
      const orderIndex = state.gradingOrder.findIndex(
        (orderItem) => orderItem.applicantId === action.payload.applicantId
      );
      state.gradingOrder[orderIndex].done = true;
    },
  },
});

export const selectGradingOrder = (state: RootState): OrderItem[] =>
  state.admin.gradingOrder;

export const selectAdmins = (state: RootState): Admin[] =>
  Object.keys(state.admin.admins).map((adminID) => state.admin.admins[adminID]);

export const selectApplicationsByTop = (
  state: RootState
): (Application | GradedApplication)[] =>
  state.admin.topOrder.map(
    (orderItem) => state.admin.applications[orderItem.applicantId]
  );

export const selectGradesByApplicant = (userID: string) => (
  state: RootState
): IndividualGradingWithName[] =>
  state.admin.grades[userID]?.map((grade) => ({
    ...grade,
    firstName: state.admin.admins[grade.adminId]?.firstName,
    lastName: state.admin.admins[grade.adminId]?.lastName,
  }));

export const selectMyGrading = (
  state: RootState,
  id: string
): IndividualGradingWithName | undefined => {
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
): Application[] =>
  state.admin.gradingOrder
    .map((orderItem) => ({
      ...state.admin.applications[orderItem.applicantId],
      done: orderItem.done,
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
