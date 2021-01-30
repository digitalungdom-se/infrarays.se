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

type Recommendation = {
  id: string;
  code: string;
  applicantId: string;
  email: string;
  lastSent: string;
  received: null | string;
  fileId: null | string;
  index: number;
};

interface PortalState {
  files: Partial<Record<FileType, FileInfo>>;
  recommendations: Recommendation[];
}

export const initialState: PortalState = {
  files: {},
  recommendations: [],
};

const authSlice = createSlice({
  name: "portal",
  initialState,
  reducers: {
    setFiles(state, action: PayloadAction<FileInfo[]>) {
      action.payload.forEach((file) => (state.files[file.type] = file));
    },
    uploadSuccess(state, action: PayloadAction<FileInfo>) {
      state.files[action.payload.type] = action.payload;
    },
    addPersonSuccess(state, action: PayloadAction<Recommendation[]>) {
      action.payload.forEach(
        (recommendation) =>
          (state.recommendations[recommendation.index] = recommendation)
      );
    },
  },
});

export const selectAllFiles = (state: RootState) => state.portal.files;
export const selectSingleFile = (
  state: RootState,
  name: FileType
): FileInfo | undefined => state.portal.files[name];
export const selectRecommendation = (
  state: RootState,
  recommendationIndex: number
): Recommendation | undefined =>
  state.portal.recommendations[recommendationIndex];

export const { setFiles, uploadSuccess, addPersonSuccess } = authSlice.actions;

export default authSlice.reducer;
