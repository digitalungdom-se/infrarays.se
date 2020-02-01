import React from 'react';
import { useParams, useHistory, Switch, Route } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import CenterCard from 'components/CenterCard';
import useFetch from 'utils/useFetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { appSuccess } from 'features/appSlice';
import { useDispatch } from 'react-redux';

const Verify = () => {
  const { token } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
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
    history.push('/');
  }

  if (response?.type === 'success' && !isLoading) {
    toast.success('Verified e-mail!', {
      position: toast.POSITION.TOP_CENTER
    });
    history.push('/');
    dispatch(appSuccess(response));
  }

  return (
    <>
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
    </>
  );
};

const MustVerify = () => {
  return <p>Du måste verifiera din e-mail.</p>;
};

const VerifyRouter = () => {
  return (
    <CenterCard maxWidth="400px" title="Verify e-mail">
      <Switch>
        <Route path="/verify/:token">
          <Verify />
        </Route>
        <Route>
          <MustVerify />
        </Route>
      </Switch>
    </CenterCard>
  );
};

export default VerifyRouter;
