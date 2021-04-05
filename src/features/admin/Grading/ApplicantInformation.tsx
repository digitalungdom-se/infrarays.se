import { FileType } from "types/files";
import React from "react";
import Upload from "features/files/Upload";
import { UploadRecommendationLetter } from "features/files/UploadRecommendationLetter";
import portal from "config/portal.json";
import { useFiles } from "features/files/filesHooks";
import { useRecommendations } from "features/recommendations/recommendationHooks";

interface ApplicantInformationProps {
  email: string;
  applicantID: string;
}

function ApplicantInformation({
  email,
  applicantID,
}: ApplicantInformationProps) {
  const { loading: loadingFiles, error: errorFiles } = useFiles(applicantID);
  const {
    loading: loadingRecommendations,
    data: recommendations,
    error,
  } = useRecommendations(applicantID);

  return (
    <div>
      <b>Email: </b>
      <a href={`mailto:${email}`}>{email}</a>
      {loadingFiles ? (
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
      {loadingRecommendations && <div>Loading</div>}
      {recommendations?.map((recommendation) => (
        <UploadRecommendationLetter
          key={recommendation.id}
          recommendationCode={recommendation.code}
        />
      ))}
    </div>
  );
}

export default ApplicantInformation;
