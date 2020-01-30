import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CenterCard from 'components/CenterCard';
import { Form, Alert } from 'react-bootstrap';
import Upload from 'components/portal/Upload';
import { useParams } from 'react-router-dom';

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
  return (
    <CenterCard maxWidth="480px" title="Ladda upp rekommendationsbrev">
      <Form>
        <p>Förklaring...</p>
        <UploadState setSuccess={setSuccess} />
        {success && <Alert variant="success">Du är klar!</Alert>}
      </Form>
    </CenterCard>
  );
};

export default Recommendation;
