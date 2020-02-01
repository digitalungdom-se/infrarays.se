import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CenterCard from 'components/CenterCard';
import { Form, Alert, Spinner, InputGroup } from 'react-bootstrap';
import Upload from 'components/portal/Upload';
import { useParams } from 'react-router-dom';
import useFetch from 'utils/useFetch';
import { useTranslation } from 'react-i18next';
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
  return (
    <Upload
      label="Ladda upp rekommendationsbrev"
      uploading={uploading}
      uploaded={name || error?.fileName}
      error={error?.msg}
      onChange={(file, fileName) => {
        if (file.size > 7 * Math.pow(10, 6)) {
          setError({ msg: 'too large', fileName });
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
  const [success, setSuccess] = useState();
  const [fileName, updateFileName] = useState();
  // const [error, setError] = useState();
  const { userID, recommendationID } = useParams();

  const { response, error, isLoading } = useFetch(
    `/api/user/recommendation?${query({ userID, recommendationID })}`
  );

  // const response = {
  //   recommendationInfo: {
  //     name: 'douglas bengtsson',
  //     fileName: 'application.pdf'
  //   },
  //   type: 'success'
  // };

  let name = '';
  if (response?.type === 'success') {
    name = response.recommendationInfo.name;
  }

  return (
    <CenterCard maxWidth="480px" title="Ladda upp rekommendationsbrev">
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
          <h4>
            För{' '}
            {name &&
              name
                .split(' ')
                .map(n => n[0].toUpperCase() + n.substring(1, n.length))
                .join(' ')}
          </h4>
          {error !== null && (
            <Alert variant="danger">
              Kunde inte hitta någon elev som tillhör denna länk
            </Alert>
          )}
          {error === null && (
            <>
              <p>
                Tack för att du vill skriva ett rekommendationsbrev!
                Rekommendationsbrevet skall skrivas, signeras och skickas av
                elevens lärare, tränare eller liknande. Max 1 sida per brev.
                Eleven kommer inte att kunna se brevet, men kommer att få
                notifikation när det är uppladdat. Det får max vara 5 MB.
              </p>
              {(response?.recommendationInfo.fileName || success) && (
                <>
                  <b>Du är klar!</b>
                  <br />
                  <ContactPerson
                    email={response?.recommendationInfo.fileName || fileName}
                    status="received"
                    cooldown={0}
                  />
                </>
              )}
              {response?.recommendationInfo.fileName === undefined &&
                !success && (
                  <UploadState
                    name={response?.recommendationInfo.fileName}
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
