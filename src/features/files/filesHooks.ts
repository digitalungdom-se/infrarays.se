import { selectApplicantFilesLoaded, setFiles } from "./filesSlice";
import { useDispatch, useSelector } from "react-redux";

import { FileInfo } from "types/files";
import useAxios from "axios-hooks";

type UseFiles = {
  loading: boolean;
  error: any;
};

export function useFiles(applicantID = "@me"): UseFiles {
  const dispatch = useDispatch();
  const files = useSelector(selectApplicantFilesLoaded(applicantID));
  const [{ loading, data, error }] = useAxios<FileInfo[]>({
    url: `/application/${applicantID}/file`,
  });
  if (Boolean(files) === false && data) {
    dispatch(setFiles(data));
  }
  return {
    loading,
    error,
  };
}
