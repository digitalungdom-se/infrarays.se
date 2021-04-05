import { FileType } from "types/files";
import React from "react";
import Upload from "features/files/Upload";
import portal from "config/portal.json";
import { useFiles } from "features/files/filesHooks";

interface ApplicantInformationProps {
  email: string;
  applicantID: string;
}

function ApplicantInformation({
  email,
  applicantID,
}: ApplicantInformationProps) {
  const { loading, error } = useFiles(applicantID);
  return (
    <div>
      <b>Email: </b>
      <a href={`mailto:${email}`}>{email}</a>
      {loading ? (
        <div>Loading</div>
      ) : (
        portal.chapters.map((chapter) =>
          chapter.upload ? (
            <Upload
              applicantID={applicantID}
              accept={chapter.upload.accept}
              fileType={chapter.fileType as FileType}
              multiple={chapter.upload.multiple}
            />
          ) : null
        )
      )}
    </div>
  );
}

export default ApplicantInformation;
