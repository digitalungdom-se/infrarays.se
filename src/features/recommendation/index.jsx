import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CenterCard from 'components/CenterCard';
import { Form, Alert, Spinner, InputGroup } from 'react-bootstrap';
import Upload from 'components/portal/Upload';
import { useParams } from 'react-router-dom';
import useFetch from 'utils/useFetch';
import { useTranslation, Trans } from 'react-i18next';
import ContactPerson from 'components/portal/ContactPerson';

const esc = encodeURIComponent;
export const query = params =>
  Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');

const UploadState = ({ name, setSuccess, updateFileName = () => {} }) => {
  const [error, setError] = useState();
  const [uploading, setUploading] = useState();
  const [uploaded, setUploaded] = useState();
  const { userID, recommendationID } = useParams();
  const { t } = useTranslation();
  return (
    <Upload
      accept=".pdf"
      label="Ladda upp rekommendationsbrev"
      uploading={uploading}
      uploaded={name || error?.fileName}
      error={error?.msg}
      onChange={(file, fileName) => {
        if (file.size > 5 * Math.pow(10, 6)) {
          setError({ msg: t('too large'), fileName });
          return;
        }
        const body = new FormData();
        body.append('file', file, fileName);
        setUploading(true);
        fetch(`/api/user/upload/recommendation/${userID}/${recommendationID}`, {
          method: 'post',
          body
        })
          .then(res => res.json())
          .then(res => {
            setUploading(false);
            if (res.type === 'success') {
              setUploaded(fileName);
              setUploading(false);
              setSuccess(true);
              updateFileName(fileName);
            }
          });
      }}
    />
  );
};

const Recommendation = () => {
  const [success, setSuccess] = useState(false);
  const [fileName, updateFileName] = useState();
  const { userID, recommendationID } = useParams();

  const { response, error, isLoading } = useFetch(
    `/api/user/recommendation?${query({ userID, recommendationID })}`
  );

  let name = '';
  if (response?.type === 'success') {
    if (!fileName && response.recommendationInfo.fileName)
      updateFileName(response.recommendationInfo.fileName);
    name = response.recommendationInfo.name
      .split(' ')
      .map(n => (n ? n[0].toUpperCase() + n.substring(1, n.length) : ''))
      .join(' ');
  }

  const { t } = useTranslation();

  return (
    <CenterCard maxWidth="480px" title={t('Upload LoR')}>
      {isLoading ? (
        <Spinner
          animation="border"
          size="lg"
          variant="custom"
          style={{
            width: '5rem',
            height: '5rem',
            fontSize: '2.5rem',
            margin: '1rem auto',
            display: 'block'
          }}
        />
      ) : (
        <Form>
          {error !== null ||
            (response?.type === 'fail' && (
              <Alert variant="danger">{t("Couldn't find any student")}</Alert>
            ))}
          {error === null && (
            <>
              <Trans i18nKey="LoR-description" name={name}>
                .<h4>For {{ name }}</h4>
                <p>
                  Thank you for taking interest in writing a letter of
                  recommendation! The letter must be written, signed and sent by
                  the students teacher, coach or such. Maximum 1 page per
                  letter. The student will not be able to see the letter, but
                  will receive a notification once it is uploaded. The file size
                  limit is 5 MB.{' '}
                </p>
                <a
                  href={t('LoR-link')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  For more information, see here.
                </a>
              </Trans>
              {fileName && (
                <>
                  <b>{t("You're done!")}</b>
                  <br />
                  <ContactPerson
                    email={fileName || response?.recommendationInfo?.fileName}
                    status="received"
                    cooldown={0}
                  />
                </>
              )}
              {response?.recommendationInfo?.fileName === undefined &&
                response?.type !== 'fail' &&
                !success && (
                  <UploadState
                    name={response?.recommendationInfo?.fileName}
                    setSuccess={setSuccess}
                    updateFileName={name => updateFileName(name)}
                  />
                )}
            </>
          )}
        </Form>
      )}
    </CenterCard>
  );
};

export default Recommendation;
