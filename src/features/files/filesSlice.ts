import { FileID, FileInfo, FileType } from "types/files";
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store";

export type Recommendation = {
  id: string;
  code?: string;
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
}

export const initialState: PortalState = {
  files: {},
  filesByType: {},
  recommendations: [],
};

const filesSlice = createSlice({
  name: "files",
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
    deleteFileSuccess(state, action: PayloadAction<FileID>) {
      const file = state.files[action.payload];
      const index = state.filesByType[file.type]?.indexOf(action.payload);
      if (index !== undefined && index > -1) {
        (state.filesByType[file.type] as FileID[]).splice(index, 1);
      }
    },
  },
});

export const selectAllFiles = (state: RootState): FileInfo[] =>
  state.portal.files;

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

export const {
  setFiles,
  uploadSuccess,
  deleteFileSuccess,
  replaceFile,
} = filesSlice.actions;

export default filesSlice.reducer;
