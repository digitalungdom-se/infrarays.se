import { FileInfo, FileType } from "types/files";
import {
  deleteFile,
  downloadFile as downloadIndividualFile,
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
  const id = applicantID === "@me" ? undefined : applicantID;
  const filesLoaded = useSelector(selectApplicantFilesLoaded(id));
  const files =
    type === undefined
      ? undefined
      : useSelector(selectFilesByFileTypeAndApplicant(type, id));
  // console.log(type, id, files);
  const [{ loading, data }] = useApi<FileInfo[]>({
    url: `/application/${applicantID}/file`,
  });
  if (filesLoaded === false && data) {
    dispatch(setFiles(data));
  }

  const removeFile = useCallback(
    (fileID) =>
      deleteFile(fileID, applicantID).then(() => {
        type && dispatch(deleteFileSuccess([applicantID, type, fileID]));
      }),
    [dispatch, type]
  );

  const addFile = useCallback(
    (fileType, file, fileName, replace) =>
      uploadFile(fileType, file, fileName).then((res) => {
        if (replace > 1) dispatch(replaceFile(res));
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
