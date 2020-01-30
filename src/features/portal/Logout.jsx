import React, { useState } from 'react';
import { logoutSuccess } from 'features/appSlice';
import { useDispatch } from 'react-redux';
import { Button, Spinner } from 'react-bootstrap';

const Logout = () => {
  const dispatch = useDispatch();
  const [loggingOut, setLogout] = useState(false);
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setLogout(true);
        fetch('/api/user/logout', {
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
      disabled={loggingOut}
    >
      {loggingOut ? (
        <span>
          <Spinner animation="border" size="sm" /> Loggar ut
        </span>
      ) : (
        'Logga ut'
      )}
    </Button>
  );
};

export default Logout;
