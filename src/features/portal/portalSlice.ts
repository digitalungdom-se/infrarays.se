import { RootState } from "store";
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

type FileInfo = {
  name?: string;
};

interface PortalState {
  files: {
    CV?: FileInfo;
  };
}

export const initialState: PortalState = {
  files: {},
};

const appSlice = createSlice({
  name: "portal",
  initialState,
  reducers: {
    setFiles(state) {
      console.log("hello");
    },
  },
});

export const selectFiles = (state: RootState) => state.portal.files;
// export const selectFiles = (state: RootState) => state.portal.files;

export const { setFiles } = appSlice.actions;

export default appSlice.reducer;
