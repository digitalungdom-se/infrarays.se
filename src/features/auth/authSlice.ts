/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store";

type UserType = "APPLICANT" | "ADMIN" | "SUPER_ADMIN";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: UserType;
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

export const selectAuthenticated = (state: RootState): boolean =>
  state.auth.isAuthorised;

export const selectUserType = (state: RootState): UserType | undefined =>
  state.auth.user?.type;

export const selectUserID = (state: RootState): string | undefined =>
  state.auth.user?.id;

export const { authSuccess, authFail, userInfoSuccess } = authSlice.actions;

export default authSlice.reducer;
