/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store";

interface Application {
  finnish: boolean;
}

interface ApplicationState {
  application: Application | null;
}

export const initialState: ApplicationState = {
  application: null,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    applicationSuccess(state, action: PayloadAction<Application>) {
      state.application = action.payload;
    },
  },
});

export const selectIsFinnish = (state: RootState): boolean | undefined =>
  state.application.application?.finnish;

export const { applicationSuccess } = applicationSlice.actions;

export default applicationSlice.reducer;
