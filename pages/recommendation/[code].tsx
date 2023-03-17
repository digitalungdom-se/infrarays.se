import { Alert, Spinner } from "react-bootstrap";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import CenterCard from "components/CenterCard";
import Upload from "components/Upload";
import { useRouter } from "next/router";
import {
  useGetRecommendationRequestConfigQuery,
  useUploadLetterOfRecommendationMutation,
} from "services/recommendations";

interface UploadStateProps {
  recommendationCode: string;
}

const UploadState = ({ recommendationCode }: UploadStateProps) => {
  const [error, setError] = useState<{
    fileName?: string;
    msg?: string;
  }>();

  const { data } = useGetRecommendationRequestConfigQuery(recommendationCode);

  const [uploadLetterOfRecommendation, { isLoading: uploading }] =
    useUploadLetterOfRecommendationMutation();

  const { t } = useTranslation();
  return (
    <Upload
      accept=".pdf"
      label={t("Upload LoR")}
      uploadLabel={t("Choose file")}
      uploading={uploading}
      uploaded={error?.fileName || data?.fileName}
      error={error?.msg}
      onChange={(file: File, fileName: string) => {
        if (file.size > 5 * 10 ** 6) {
          setError({ msg: t("too large"), fileName });
          return;
        }
        uploadLetterOfRecommendation({
          file,
          fileName,
          code: recommendationCode,
        });
      }}
    />
  );
};

interface UploadRecommendationLetterProps {
  recommendationCode: string;
}

export const UploadRecommendationLetter = ({
  recommendationCode,
}: UploadRecommendationLetterProps): React.ReactElement => {
  return <UploadState recommendationCode={recommendationCode} />;
};

const RecommendationCard = (): React.ReactElement => {
  const router = useRouter();
  const recommendationCode = router.query.code?.toString() || "";

  const {
    data,
    isLoading: loading,
    error,
  } = useGetRecommendationRequestConfigQuery(recommendationCode);

  const { t } = useTranslation();
  const name = data?.applicantFirstName + " " + data?.applicantLastName;
  return (
    <CenterCard maxWidth="480px" title={t("Upload LoR")}>
      {loading ? (
        <Spinner
          animation="border"
          variant="custom"
          style={{
            width: "5rem",
            height: "5rem",
            fontSize: "2.5rem",
            margin: "1rem auto",
            display: "block",
          }}
        />
      ) : (
        <>
          {error &&
            ((error as any)?.response == undefined ? (
              <Alert variant="danger">{t("Couldn't find any student")}</Alert>
            ) : (
              <Alert variant="danger">{t("Cant connect to server")}</Alert>
            ))}
          {error === undefined && (
            <>
              <Trans i18nKey="LoR-description">
                <h4>For {{ name }}</h4>
                <p>
                  Thank you for taking interest in writing a letter of
                  recommendation!
                </p>
                <p>
                  The letter must be written, signed and sent by the
                  student&apos;s teacher, coach or such. Maximum 1 page per
                  letter.
                </p>
                <p>
                  The student will not be able to see the letter, but will
                  receive a notification once it is uploaded. The file size
                  limit is 5 MB.{" "}
                </p>
                <a
                  href={t("LoR-link")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  For more information, see here.
                </a>
              </Trans>
              <UploadState recommendationCode={recommendationCode} />
            </>
          )}
        </>
      )}
    </CenterCard>
  );
};

export default RecommendationCard;
