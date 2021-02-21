/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store";
import { SurveyAnswers } from "components/Survey";

export type FileType =
  | "CV"
  | "COVER_LETTER"
  | "GRADES"
  | "RECOMMENDATION_LETTER"
  | "APPENDIX"
  | "ESSAY";

export type FileID = string;

export type FileInfo = {
  id: FileID;
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
  files: Record<FileID, FileInfo>;
  filesByType: Partial<Record<FileType, FileID[]>>;
  recommendations: Recommendation[];
  survey?: SurveyAnswers;
}

export const initialState: PortalState = {
  files: {},
  filesByType: {},
  recommendations: [],
  survey: undefined,
};

const portalSlice = createSlice({
  name: "portal",
  initialState,
  reducers: {
    setFiles(state, action: PayloadAction<FileInfo[]>) {
      action.payload.forEach((file) => {
        state.files[file.id] = file;
        if (state.filesByType[file.type])
          state.filesByType[file.type]?.unshift(file.id);
        else state.filesByType[file.type] = [file.id];
      });
    },
    replaceFile(state, action: PayloadAction<FileInfo>) {
      const file = action.payload;
      state.files[file.id] = file;
      if (state.filesByType[file.type])
        state.filesByType[file.type] = [file.id];
      else state.filesByType[file.type] = [file.id];
    },
    uploadSuccess(state, action: PayloadAction<FileInfo>) {
      const file = action.payload;
      state.files[file.id] = file;
      if (state.filesByType[file.type])
        state.filesByType[file.type]?.push(file.id);
      else state.filesByType[file.type] = [file.id];
    },
    addPersonSuccess(state, action: PayloadAction<Recommendation[]>) {
      action.payload.forEach(
        (recommendation) =>
          (state.recommendations[recommendation.index] = recommendation)
      );
    },
    setSurvey(state, action: PayloadAction<SurveyAnswers>) {
      state.survey = action.payload;
    },
    clearPortal(state) {
      state = initialState;
    },
    deleteFileSuccess(state, action: PayloadAction<FileID>) {
      const file = state.files[action.payload];
      const index = state.filesByType[file.type]?.indexOf(action.payload);
      if (index !== undefined && index > -1) {
        (state.filesByType[file.type] as FileID[]).splice(index, 1);
      }
    },
  },
});

export const selectAllFiles = (state: RootState) => state.portal.files;
export const selectSingleFileByFileType = (
  state: RootState,
  type: FileType
): FileInfo | undefined => {
  if (state.portal.filesByType[type]) {
    const files = state.portal.filesByType[type];
    if (files) return state.portal.files[files[0]];
    else return undefined;
  }
  return undefined;
};
export const selectFilesByFileType = (
  state: RootState,
  type: FileType
): FileInfo[] | undefined => {
  const array = state.portal.filesByType[type]?.map(
    (fileID) => state.portal.files[fileID]
  );
  if (array === undefined || type === "APPENDIX") return array;
};
export const selectRecommendation = (
  state: RootState,
  recommendationIndex: number
): Recommendation | undefined =>
  state.portal.recommendations[recommendationIndex];
export const selectSurvey = (state: RootState): SurveyAnswers | undefined =>
  state.portal.survey;
export const selectProgress = (state: RootState): number => {
  let i = 0;
  const check: FileType[] = ["CV", "COVER_LETTER", "GRADES", "ESSAY"];
  check.forEach((name: FileType) => {
    if (state.portal.filesByType[name] !== undefined) i++;
  });
  if (state.portal.survey !== undefined) i++;
  return i;
};

export const {
  setFiles,
  uploadSuccess,
  addPersonSuccess,
  setSurvey,
  clearPortal,
  deleteFileSuccess,
  replaceFile,
} = portalSlice.actions;

export default portalSlice.reducer;
