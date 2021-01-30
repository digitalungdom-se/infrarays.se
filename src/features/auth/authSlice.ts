/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store";

interface AuthState {
  isAuthorised: boolean;
}

export const initialState: AuthState = {
  isAuthorised: false,
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
    },
  },
});

export const selectAuthenticated = (state: RootState) =>
  state.auth.isAuthorised;

export const { authSuccess, authFail } = authSlice.actions;

export default authSlice.reducer;
