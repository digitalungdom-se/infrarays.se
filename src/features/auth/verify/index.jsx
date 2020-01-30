import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import CenterCard from 'components/CenterCard';
import useFetch from 'utils/useFetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verify = () => {
  const { token } = useParams();
  const history = useHistory();
  const { response, error, isLoading } = useFetch('/api/user/verify', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  });

  if (response?.type === 'fail' && response?.errors[0].msg === 'no token') {
    toast.info('Du är redan verifierad', {
      position: toast.POSITION.TOP_CENTER
    });
    history.push('/portal');
  }

  if (response?.type === 'success' && !isLoading) {
    toast.success('Verified e-mail!', {
      position: toast.POSITION.TOP_CENTER
    });
    history.push('/portal');
  }

  return (
    <CenterCard maxWidth="400px" title="Verify e-mail">
      {isLoading && (
        <div style={{ textAlign: 'center' }}>
          Verifierar din e-mail...
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
        </div>
      )}
      {response?.type === 'fail' && (
        <Alert variant="danger">
          {response?.errors[0]?.msg === 'no token'}
          <b>Ogiltig token.</b> Länken som du har klickat på innehåller en
          ogiltig token:
          <code
            style={{ textAlign: 'center', display: 'block', paddingBottom: 0 }}
          >
            {token}
          </code>
          Dubbelkolla att du har klickat på rätt länk. Om det inte fungerar ska
          du kontakta portalansvariga,{' '}
          <a href="mailto:styrelse@digitalungdom.se">
            styrelse@digitalungdom.se
          </a>
          .
        </Alert>
      )}
      {error && <Alert variant="danger">Nätverksproblem.</Alert>}
    </CenterCard>
  );
};

export default Verify;
