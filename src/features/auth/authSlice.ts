/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: "APPLICANT" | "ADMIN" | "SUPER_ADMIN";
  verified: boolean;
  created: string;
}

interface AuthState {
  isAuthorised: boolean;
  user: User | null;
}

export const initialState: AuthState = {
  isAuthorised: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess(state) {
      state.isAuthorised = true;
    },
    authFail(state) {
      state.isAuthorised = false;
      state.user = null;
    },
    userInfoSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const selectAuthenticated = (state: RootState) =>
  state.auth.isAuthorised;

export const { authSuccess, authFail, userInfoSuccess } = authSlice.actions;

export default authSlice.reducer;
