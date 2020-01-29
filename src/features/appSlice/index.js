/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appSuccess(state, action) {
      state.userData = action.payload.userData;
      state.files = action.payload.files;
    }
  }
});

export const {
  // login actions
  appSuccess
} = appSlice.actions;

export default appSlice.reducer;
