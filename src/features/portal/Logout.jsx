import React, { useState } from 'react';
import { logoutSuccess } from 'features/appSlice';
import { useDispatch } from 'react-redux';
import { Button, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Logout = ({ url = '/api/user/logout', style = {} }) => {
  const dispatch = useDispatch();
  const [loggingOut, setLogout] = useState(false);
  const { t } = useTranslation();
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setLogout(true);
        fetch(url, {
          method: 'delete'
        })
          .then(res => res.json())
          .then(res => {
            setLogout(false);
            if (res.type === 'success') {
              dispatch(logoutSuccess());
            }
          });
      }}
      style={style}
      disabled={loggingOut}
    >
      {loggingOut ? (
        <span>
          <Spinner animation="border" size="sm" /> {t('Logging out')}
        </span>
      ) : (
        t('Log out')
      )}
    </Button>
  );
};

export default Logout;
