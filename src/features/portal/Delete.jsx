import React, { useState } from 'react';
import { logoutSuccess } from 'features/appSlice';
import { useDispatch } from 'react-redux';
import { Button, Spinner, Modal, Form, FormControl } from 'react-bootstrap';
import StyledGroup from 'components/StyledGroup';
import { useTranslation } from 'react-i18next';

const ConfirmModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [deleting, setDelete] = useState(false);
  const [error, setError] = useState();
  const { t } = useTranslation();
  return (
    <Modal
      onHide={onHide}
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('Do you want to delete your account?')}
        </Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={e => {
          e.preventDefault();
          const password = e.target?.password?.value;
          setDelete(true);
          fetch('/api/user/application', {
            method: 'delete',
            body: JSON.stringify({ password })
          })
            .then(res => res.json())
            .then(res => {
              setDelete(false);
              if (res.type === 'success') {
                dispatch(logoutSuccess());
              } else {
                res.json = true;
                throw res;
              }
            })
            .catch(err => {
              if (err.json) {
                setError(err.msg);
              }
            });
        }}
      >
        <Modal.Body>
          <p>{t('Once you have deleted')}</p>
          {false && (
            <StyledGroup
              className="inputbox"
              style={{ margin: '0 auto' }}
              controlId="form-password"
            >
              <FormControl
                isInvalid={error}
                type="password"
                placeholder="Lösenord"
                name="password"
              />
              <Form.Label>Lösenord</Form.Label>
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </StyledGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>{t('Cancel')}</Button>
          <Button type="submit" variant="danger" disabled={deleting}>
            {deleting ? (
              <span>
                <Spinner animation="border" size="sm" /> {t('Deleting account')}
              </span>
            ) : (
              t('Delete account')
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const Delete = () => {
  const [modalVisible, showModal] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <ConfirmModal show={modalVisible} onHide={() => showModal(false)} />
      <Button
        variant="danger"
        onClick={() => {
          showModal(true);
        }}
      >
        {t('Delete account')}
      </Button>
    </>
  );
};

export default Delete;
