/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserTypes } from "types/user";

import { RootState } from "store";
import { ServerTokenResponse } from "types/tokens";

interface AuthState {
  token?: Token;
}

interface Token {
  access_token: string;
  refresh_token: string;
  expires: number;
  token_type: string;
  refreshTime: number;
}

export const initialState: AuthState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess(state, action: PayloadAction<ServerTokenResponse>) {
      state.token = { ...action.payload, refreshTime: Date.now() };
      // state.isAuthorised = true;
    },
    authFail(state) {
      state.token = undefined;
    },
    // authFail(state) {
    //   state.isAuthorised = false;
    //   state.user = null;
    // },
    // userInfoSuccess(state, action: PayloadAction<User>) {
    //   state.user = action.payload;
    // },
  },
});

// export const selectAuthenticated = (state: RootState): boolean =>
//   state.auth.isAuthorised;

// export const selectUserType = (state: RootState): UserTypes | undefined =>
//   state.auth.user?.type;

// export const selectUserID = (state: RootState): string | undefined =>
//   state.auth.user?.id;

export const { authSuccess, authFail } = authSlice.actions;

export default authSlice.reducer;
