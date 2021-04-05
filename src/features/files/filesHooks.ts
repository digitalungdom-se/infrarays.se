import { selectApplicantFilesLoaded, setFiles } from "./filesSlice";
import { useDispatch, useSelector } from "react-redux";

import { FileInfo } from "types/files";
import useApi from "hooks/useApi";

type UseFiles = {
  loading: boolean;
};

export function useFiles(applicantID = "@me"): UseFiles {
  const dispatch = useDispatch();
  const files = useSelector(selectApplicantFilesLoaded(applicantID));
  const [{ loading, data }] = useApi<FileInfo[]>({
    url: `/application/${applicantID}/file`,
  });
  if (Boolean(files) === false && data) {
    dispatch(setFiles(data));
  }
  return {
    loading,
  };
}
