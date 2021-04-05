import { FileInfo, FileType } from "types/files";
import {
  deleteFile,
  downloadFile as downloadIndividualFile,
  getFilesConfiguration,
  uploadFile,
} from "api/files";
import {
  deleteFileSuccess,
  replaceFile,
  selectApplicantFilesLoaded,
  selectFilesByFileTypeAndApplicant,
  setFiles,
} from "./filesSlice";
import useApi, { UseApi } from "hooks/useApi";
import { useDispatch, useSelector } from "react-redux";

import { RecommendationFile } from "types/recommendations";
import { getRecommendationRequestConfig } from "api/recommendations";
import { useCallback } from "react";

type UseFiles = (
  applicantID?: string,
  type?: FileType
) => UseApi<FileInfo[]> & {
  removeFile: (fileID: string) => Promise<void>;
  addFile: (
    fileType: FileType,
    file: File,
    fileName: string,
    replace?: boolean
  ) => Promise<void>;
  downloadFile: (fileID: string) => Promise<void>;
};

export const useFiles: UseFiles = (applicantID = "@me", type?: FileType) => {
  const dispatch = useDispatch();
  // if applicantID is @me then we don't want to call redux with
  // any function as it will automatically replace with the user id
  const id = applicantID === "@me" ? undefined : applicantID;

  // if the function is not called with any file type, there are no files to get
  const files =
    type === undefined
      ? undefined
      : useSelector(selectFilesByFileTypeAndApplicant(type, id));

  // use an API hook to load in the data with a configured get request.
  const [{ loading, data }] = useApi<FileInfo[]>(
    getFilesConfiguration(applicantID)
  );

  // if files are already loaded in redux we don't want to dispatch them again
  const filesLoaded = useSelector(selectApplicantFilesLoaded(id));
  if (filesLoaded === false && data) {
    dispatch(setFiles(data));
  }

  // callback to remove a file and delete it from the store
  const removeFile = useCallback(
    (fileID) =>
      deleteFile(fileID, applicantID).then(() => {
        type && dispatch(deleteFileSuccess([applicantID, type, fileID]));
      }),
    [dispatch, type]
  );

  // callback to upload a file and add it to the store
  const addFile = useCallback(
    (fileType, file, fileName, replace?: boolean) =>
      uploadFile(fileType, file, fileName).then((res) => {
        // replace if nece
        if (replace) dispatch(replaceFile(res));
        else dispatch(setFiles([res]));
      }),
    [dispatch, type]
  );

  const downloadFile = useCallback(
    (fileID: string) => downloadIndividualFile(fileID, applicantID),
    [applicantID]
  );

  return {
    loading,
    data: files,
    removeFile,
    addFile,
    downloadFile,
  };
};

export function useRecommendationLetter(
  code: string
): UseApi<RecommendationFile> {
  const [{ loading, data, error }] = useApi<RecommendationFile>(
    getRecommendationRequestConfig(code)
  );
  return { loading, data, error };
}
