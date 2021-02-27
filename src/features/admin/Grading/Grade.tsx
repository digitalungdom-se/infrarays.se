import { Button, Modal } from "react-bootstrap";
import GradingModal, { GradeFormValues } from "components/GradingModal";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface GradeProps {
  id: string;
}

const handleSubmit = (id: string, values: GradeFormValues) =>
  axios.post(`/application/${id}/grade`, values);

const Grade: React.FC<GradeProps> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <>
      <Button onClick={handleClick}>
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Modal show={open} onHide={handleClick}>
        <Modal.Body>
          <GradingModal onSubmit={(values) => handleSubmit(id, values)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Grade;
