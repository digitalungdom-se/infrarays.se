import { Button, Modal, Spinner } from "react-bootstrap";
import React, { useState } from "react";

import Axios from "api/axios";
import { TokenStorage } from "utils/tokenInterceptor";
import { useTranslation } from "react-i18next";

interface ConfirmModalProps {
  show: boolean;
  onHide: () => void;
}

const ConfirmModal = ({ show, onHide }: ConfirmModalProps) => {
  const [deleting, setDelete] = useState(false);
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
          {t("Do you want to delete your account?")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("Once you have deleted")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>{t("Cancel")}</Button>
        <Button
          type="submit"
          variant="danger"
          disabled={deleting}
          onClick={() => {
            setDelete(true);
            Axios.delete("/user/@me").then(() => {
              TokenStorage.clear();
            });
          }}
        >
          {deleting ? (
            <span>
              <Spinner animation="border" size="sm" /> {t("Deleting account")}
            </span>
          ) : (
            t("Delete account")
          )}
        </Button>
      </Modal.Footer>
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
        {t("Delete account")}
      </Button>
    </>
  );
};

export default Delete;
