import { useGetFilesQuery } from "services/file";
import { useGetSurveyQuery } from "services/survey";
import { FileType } from "types/files";

function useProgress(applicant = "@me"): number {
  const { data: files } = useGetFilesQuery(applicant);
  const { data: survey } = useGetSurveyQuery(applicant);
  let count = 0;
  if (files) {
    const check: Array<FileType> = ["CV", "COVER_LETTER", "GRADES", "ESSAY"];
    files.forEach((file) => {
      if (check.indexOf(file.type) !== -1) count++;
    });
  }
  if (survey) {
    count++;
  }
  return count;
}

export default useProgress;
