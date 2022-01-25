import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import Alert from "react-bootstrap/Alert";
import CenterCard from "components/CenterCard";
import Spinner from "react-bootstrap/Spinner";
import Upload from "components/portal/Upload";
import axios from "axios";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";

interface UploadStateProps {
  uploadedFileName: string;
  recommendationCode: string;
}

const UploadState = ({
  uploadedFileName,
  recommendationCode,
}: UploadStateProps) => {
  const [error, setError] = useState<
    | {
        fileName?: string;
        msg?: string;
      }
    | undefined
  >();
  const [uploading, setUploading] = useState<boolean>();
  const [uploaded, setUploaded] = useState<string>();
  const { t } = useTranslation();

  const handleCancel = () => {
    setError(undefined);
  };
  return (
    <>
      <Upload
        accept=".pdf"
        label={t("Upload LoR")}
        uploadLabel={t("Choose file")}
        uploading={uploading}
        uploaded={error?.fileName || uploaded || uploadedFileName}
        error={error?.msg}
        onCancel={handleCancel}
        onChange={(file: File, fileName: string) => {
          if (file.size > 5 * 10 ** 6) {
            setError({ msg: t("too large"), fileName });
            return;
          }
          if (
            fileName.length > 4 &&
            fileName.substring(fileName.length - 4) !== ".pdf"
          ) {
            setError({ msg: t("Only PDF"), fileName });
            return;
          }
          const body = new FormData();
          body.append("file", file, fileName);
          setUploading(true);
          axios
            .post(`/application/recommendation/${recommendationCode}`, body)
            .then((res) => {
              setUploading(false);
              setError(undefined);
              setUploaded(res.data.name);
            })
            .catch((err) => {
              setError({ msg: t(err.message), fileName });
              setUploading(false);
            });
        }}
      />
      {Boolean(uploaded || uploadedFileName) && !error && (
        <Alert variant="success">{t("You're done!")}</Alert>
      )}
    </>
  );
};

const Recommendation = (): React.ReactElement => {
  const { recommendationCode } = useParams<{ recommendationCode: string }>();

  const [{ response, error, loading }] = useAxios(
    `/application/recommendation/${recommendationCode}`
  );

  const { t } = useTranslation();

  const name =
    response?.data.applicantFirstName + " " + response?.data.applicantLastName;

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
            ((!!error.isAxiosError && !error.response) === false ? (
              <Alert variant="danger">{t("Couldn't find any student")}</Alert>
            ) : (
              <Alert variant="danger">{t("Cant connect to server")}</Alert>
            ))}
          {error === null && (
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
              <UploadState
                uploadedFileName={response?.data.fileName}
                recommendationCode={recommendationCode || ''}
              />
            </>
          )}
        </>
      )}
    </CenterCard>
  );
};

export default Recommendation;
