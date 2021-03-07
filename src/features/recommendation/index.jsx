import { Alert, Form, Spinner } from "react-bootstrap";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import CenterCard from "components/CenterCard";
import Upload from "components/portal/Upload";
import axios from "axios";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";

const esc = encodeURIComponent;
export const query = (params) =>
  Object.keys(params)
    .map((k) => `${esc(k)}=${esc(params[k])}`)
    .join("&");

const UploadState = ({ uploadedFileName, setSuccess }) => {
  const [error, setError] = useState();
  const [uploading, setUploading] = useState();
  const [uploaded, setUploaded] = useState();
  const { recommendationCode } = useParams();
  const { t } = useTranslation();
  return (
    <Upload
      accept=".pdf"
      label={t("Upload LoR")}
      uploadLabel={t("Choose file")}
      uploading={uploading}
      uploaded={error?.fileName || uploaded || uploadedFileName}
      error={error?.msg}
      onChange={(file, fileName) => {
        if (file.size > 5 * 10 ** 6) {
          setError({ msg: t("too large"), fileName });
          return;
        }
        const body = new FormData();
        body.append("file", file, fileName);
        setUploading(true);
        axios
          .post(`/application/recommendation/${recommendationCode}`, body)
          .then((res) => {
            setUploading(false);
            setError({ fileName: null });
            setUploaded(res.data.name);
          });
      }}
    />
  );
};

const Recommendation = () => {
  const { recommendationCode } = useParams();

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
          size="lg"
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
        <Form>
          {error !== null ||
            (response?.type === "fail" && (
              <Alert variant="danger">{t("Couldn't find any student")}</Alert>
            ))}
          {error && (
            <Alert variant="danger">{t("Cant connect to server")}</Alert>
          )}
          {error === null && (
            <>
              <Trans i18nKey="LoR-description">
                <h4>For {{ name }}</h4>
                <p>
                  Thank you for taking interest in writing a letter of
                  recommendation!
                </p>
                <p>
                  The letter must be written, signed and sent by the students
                  teacher, coach or such. Maximum 1 page per letter.
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
                recommendationCode={recommendationCode}
              />
            </>
          )}
        </Form>
      )}
    </CenterCard>
  );
};

export default Recommendation;
