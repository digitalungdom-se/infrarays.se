import { FileType } from "types/files";
import { RootState } from "store";

export const selectProgress = (applicantID?: string) => (
  state: RootState
): number => {
  const id = applicantID || state.auth.user?.id;
  let progress = 0;
  if (!id) return progress;
  const check: Array<FileType> = ["CV", "COVER_LETTER", "GRADES", "ESSAY"];
  check.forEach((type) => {
    const filesByTypes = state.files.fileTypesByApplicants[id];
    const files = filesByTypes?.[type];
    if (files?.length) progress++;
  });
  if (state.survey[id]) progress++;
  return progress;
};
