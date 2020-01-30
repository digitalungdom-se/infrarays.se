import React, { useState } from 'react';
import { logoutSuccess } from 'features/appSlice';
import { useDispatch } from 'react-redux';
import { Button, Spinner, Modal, Form, FormControl } from 'react-bootstrap';
import StyledGroup from 'components/StyledGroup';

const ConfirmModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [deleting, setDelete] = useState(false);
  const [error, setError] = useState();
  return (
    <Modal
      onHide={onHide}
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Vill du radera ditt konto?
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
          <p>
            När du väl har tagit bort ditt konto går det inte att få tillbaka.
            Vänligen bekräfta att du vill ta bort det.
          </p>
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
          <Button onClick={onHide}>Avbryt</Button>
          <Button type="submit" variant="danger" disabled={deleting}>
            {deleting ? (
              <span>
                <Spinner animation="border" size="sm" /> Raderar konto
              </span>
            ) : (
              'Radera konto'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const Delete = () => {
  const [modalVisible, showModal] = useState(false);
  return (
    <>
      <ConfirmModal show={modalVisible} onHide={() => showModal(false)} />
      <Button
        variant="danger"
        onClick={() => {
          showModal(true);
        }}
      >
        Radera konto
      </Button>
    </>
  );
};

export default Delete;
