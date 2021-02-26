/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store";

interface AdminState {
  order: OrderItem[];
  applications: Record<string, ApplicantInfo>;
}

export interface OrderItem {
  id: string;
  adminId: string;
  applicantId: string;
  order: number;
  done: boolean;
}

interface ApplicantInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  finnish: boolean;
  birthdate: string;
  city: string;
  school: string;
}

export const initialState: AdminState = {
  order: [],
  applications: {},
};

const adminSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setApplications(state, action: PayloadAction<ApplicantInfo[]>) {
      action.payload.forEach(
        (applicant) => (state.applications[applicant.id] = applicant)
      );
    },
    updateGradingOrder(state, action: PayloadAction<OrderItem[]>) {
      state.order = action.payload;
    },
  },
});

export const selectGradingOrder = (state: RootState): OrderItem[] =>
  state.admin.order;

export const selectApplicantsInGradingOrder = (
  state: RootState
): ApplicantInfo[] =>
  state.admin.order
    .map((orderItem) => state.admin.applications[orderItem.applicantId])
    .filter((val) => val);

export const { updateGradingOrder, setApplications } = adminSlice.actions;

export default adminSlice.reducer;
