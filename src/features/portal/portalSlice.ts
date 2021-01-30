/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store";

export type FileType =
  | "CV"
  | "COVER_LETTER"
  | "GRADES"
  | "RECOMMENDATION_LETTER"
  | "APPENDIX"
  | "ESSAY";

export type FileInfo = {
  id: string;
  userId: string;
  type: FileType;
  created: string;
  name: string;
  mime: string;
};

interface PortalState {
  files: Partial<Record<FileType, FileInfo>>;
}

export const initialState: PortalState = {
  files: {},
};

const appSlice = createSlice({
  name: "portal",
  initialState,
  reducers: {
    setFiles(state, action: PayloadAction<FileInfo[]>) {
      action.payload.forEach((file) => (state.files[file.type] = file));
    },
    uploadSuccess(state, action: PayloadAction<FileInfo>) {
      state.files[action.payload.type] = action.payload;
    },
  },
});

export const selectAllFiles = (state: RootState) => state.portal.files;
export const selectSingleFile = (
  state: RootState,
  name: FileType
): FileInfo | undefined => state.portal.files[name];

export const { setFiles, uploadSuccess } = appSlice.actions;

export default appSlice.reducer;
