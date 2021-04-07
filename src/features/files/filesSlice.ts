import { FileID, FileInfo, FileType } from "types/files";
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store";

type FilesByType = Partial<Record<FileType, FileInfo[]>>;

interface FilesState {
  fileTypesByApplicants: Record<string, FilesByType>;
}

export const initialState: FilesState = {
  fileTypesByApplicants: {},
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles(state, action: PayloadAction<FileInfo[]>) {
      action.payload.forEach((file) => {
        if (state.fileTypesByApplicants[file.userId] === undefined) {
          state.fileTypesByApplicants[file.userId] = {};
        }
        if (state.fileTypesByApplicants[file.userId][file.type])
          state.fileTypesByApplicants[file.userId][file.type]?.push(file);
        else state.fileTypesByApplicants[file.userId][file.type] = [file];
      });
    },
    replaceFile(state, action: PayloadAction<FileInfo>) {
      const file = action.payload;
      state.fileTypesByApplicants[file.userId][file.type] = [file];
    },
    uploadSuccess(state, action: PayloadAction<FileInfo>) {
      const file = action.payload;
      const files = state.fileTypesByApplicants[file.userId][file.type];
      if (files) files.push(file);
      else state.fileTypesByApplicants[file.userId][file.type] = [file];
    },
    deleteFileSuccess(
      state,
      action: PayloadAction<[FileID, FileType, FileID]>
    ) {
      const [applicantID, fileType, fileID] = action.payload;
      const files = state.fileTypesByApplicants[applicantID][fileType];
      if (files)
        state.fileTypesByApplicants[applicantID][fileType] = files?.filter(
          (file) => file.id !== fileID
        );
    },
  },
});

export const selectApplicantFilesLoaded = (applicantID?: string) => (
  state: RootState
): boolean => {
  const id = applicantID || state.auth.user?.id;
  if (!id) return false;
  const fileTypesByApplicants = state.files.fileTypesByApplicants[id];
  return Boolean(fileTypesByApplicants);
};

export const selectFilesByFileTypeAndApplicant = (
  type: FileType,
  applicantID?: string
) => (state: RootState): FileInfo[] => {
  const id = applicantID || state.auth.user?.id;
  if (!id) return [];
  const fileTypes = state.files.fileTypesByApplicants[id];
  if (fileTypes) return fileTypes[type] || [];
  return [];
};

export const {
  setFiles,
  uploadSuccess,
  deleteFileSuccess,
  replaceFile,
} = filesSlice.actions;

export default filesSlice.reducer;
