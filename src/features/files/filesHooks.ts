import { selectApplicantFilesLoaded, setFiles } from "./filesSlice";
import useApi, { UseApi } from "hooks/useApi";
import { useDispatch, useSelector } from "react-redux";

import { FileInfo } from "types/files";
import { RecommendationFile } from "types/recommendations";
import { getRecommendationRequestConfig } from "api/recommendations";

type UseFiles = {
  loading: boolean;
};

export function useFiles(applicantID = "@me"): UseFiles {
  const dispatch = useDispatch();
  const filesLoaded = useSelector(selectApplicantFilesLoaded(applicantID));
  const [{ loading, data }] = useApi<FileInfo[]>({
    url: `/application/${applicantID}/file`,
  });
  if (filesLoaded === false && data) {
    dispatch(setFiles(data));
  }
  return {
    loading,
  };
}

export function useRecommendationLetter(
  code: string
): UseApi<RecommendationFile> {
  const [{ loading, data, error }] = useApi<RecommendationFile>(
    getRecommendationRequestConfig(code)
  );
  return { loading, data, error };
}
