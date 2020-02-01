import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CenterCard from 'components/CenterCard';
import { Form, Alert } from 'react-bootstrap';
import Upload from 'components/portal/Upload';
import { useParams } from 'react-router-dom';
import useFetch from 'utils/useFetch';
import { useTranslation } from 'react-i18next';

const UploadState = ({ setSuccess }) => {
  const [uploading, setUploading] = useState();
  const [uploaded, setUploaded] = useState();
  const { userID, recommendationID } = useParams();
  return (
    <Upload
      label="Ladda upp rekommendationsbrev"
      uploading={uploading}
      uploaded={uploaded}
      onChange={(file, fileName) => {
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
            }
          });
      }}
    />
  );
};

const Recommendation = () => {
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const { userID, recommendationID } = useParams();

  const [requested, setRequest] = useState(false);
  const [response, setResponse] = useState();
  function doFetch() {
    setRequest(true);
    console.log(requested);
    fetch('/api/user/recommendation', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userID, recommendationID })
    })
      .then(res => res.json())
      .then(res => {
        if (res.type === 'success') {
          setResponse(res);
        } else {
          res.json = true;
          throw res;
        }
      })
      .catch(err => {
        setError(err);
      });
  }

  if (!requested) doFetch();

  return (
    <CenterCard maxWidth="480px" title="Ladda upp rekommendationsbrev">
      <Form>
        <h4>Rekommendationsbrev för</h4>
        {error !== undefined && (
          <Alert variant="danger">
            Kunde inte hitta någon elev som tillhör denna länk
          </Alert>
        )}
        {error === undefined && (
          <>
            <p>
              Tack för att du vill skriva ett rekommendationsbrev!
              Rekommendationsbrevet skall skrivas, signeras och skickas av
              elevens lärare, tränare eller liknande. Max 1 sida per brev.
              Eleven kommer inte att kunna se brevet, men kommer att få
              notifikation när det är uppladdat. Det får max vara 5 MB.
            </p>
            <UploadState setSuccess={setSuccess} />
            {success && <Alert variant="success">Du är klar!</Alert>}
          </>
        )}
      </Form>
    </CenterCard>
  );
};

export default Recommendation;
