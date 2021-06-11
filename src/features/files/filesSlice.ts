import { FileID, FileInfo } from "types/files";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store";

// Files are organized by their string, i.e. CV: [file1, file2, etc]
type FilesByType = Partial<Record<string, FileInfo[]>>;

// File types are organized by the application IDs, i.e. [user1_ID]: {CV: files}
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
      // loop through each file
      action.payload.forEach((file) => {
        // if no files have been added to user, create an empty object
        if (state.fileTypesByApplicants[file.userId] === undefined) {
          state.fileTypesByApplicants[file.userId] = {};
        }
        // add the file to the store
        if (
          // if there are already uploaded files for this string
          state.fileTypesByApplicants[file.userId][file.type] &&
          // and if the file is NOT already in there
          state.fileTypesByApplicants[file.userId][file.type]?.findIndex(
            (f) => f.id === file.id
          ) === -1
        ) {
          // add the file to the array
          state.fileTypesByApplicants[file.userId][file.type]?.push(file);
        } // otherwise create a new array for the file
        else state.fileTypesByApplicants[file.userId][file.type] = [file];
      });
    },
    replaceFile(state, action: PayloadAction<FileInfo>) {
      const file = action.payload;
      // replace the array for the files - assuming only one file should exist
      state.fileTypesByApplicants[file.userId][file.type] = [file];
    },
    uploadSuccess(state, action: PayloadAction<FileInfo>) {
      const file = action.payload;
      const files = state.fileTypesByApplicants[file.userId][file.type];
      // if there are files, add it to the array
      if (files) files.push(file);
      // otherwise create a new array
      else state.fileTypesByApplicants[file.userId][file.type] = [file];
    },
    deleteFileSuccess(state, action: PayloadAction<[FileID, string, FileID]>) {
      const [applicantID, fileType, fileID] = action.payload;
      const files = state.fileTypesByApplicants[applicantID][fileType];
      files?.filter((file) => file.id !== fileID);
    },
    clearFiles(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setFiles,
  uploadSuccess,
  deleteFileSuccess,
  replaceFile,
  clearFiles,
} = filesSlice.actions;

export const selectApplicantFilesLoaded = (applicantID?: string) => (
  state: RootState
): boolean => {
  // if there is no id defined, use the userID
  const id = applicantID || state.auth.user?.id;
  // if there is no id then there are no files
  if (!id) return false;
  // check if there are files
  const fileTypesByApplicants = state.files.fileTypesByApplicants[id];
  return Boolean(fileTypesByApplicants);
};

export const selectFilesByIDAndApplicant = (
  type: string,
  applicantID?: string
) => (state: RootState): FileInfo[] => {
  const id = applicantID || state.auth.user?.id;
  // no id -> no files
  if (!id) return [];
  const fileTypes = state.files.fileTypesByApplicants[id];
  // if there are files, get the relevant files by the type. undefined -> no files
  if (fileTypes) return fileTypes[type] || [];
  // catch all
  return [];
};

export default filesSlice.reducer;
