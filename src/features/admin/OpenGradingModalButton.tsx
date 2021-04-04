import { Button, Modal, Spinner } from "react-bootstrap";
import { Grading, selectMyGrading, setGrades, setMyGrade } from "./adminSlice";
import GradingModal, { GradeFormValues } from "components/GradingModal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ButtonProps } from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "store";
import axios from "api/axios";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface GradeProps {
  id: string;
  variant?: ButtonProps["variant"];
}

const handleSubmit = (id: string, values: GradeFormValues) =>
  axios.post(`/application/${id}/grade`, values);

const Grade: React.FC<GradeProps> = ({ id, variant = "primary" }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const gradingData = useSelector((state: RootState) =>
    selectMyGrading(state, id)
  );
  const handleClick = () => {
    setOpen(!open);
    if (!open && gradingData === undefined) {
      setLoading(true);
      axios.get<Grading[]>(`/application/${id}/grade`).then((res) => {
        dispatch(setGrades({ grades: res.data, applicantId: id }));
        setLoading(false);
      });
    }
  };
  let name, initialValues;
  if (gradingData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { firstName, lastName, ...myGrading } = gradingData;
    name = firstName + " " + lastName;
    initialValues = myGrading;
  }

  return (
    <>
      <Button onClick={handleClick} variant={variant}>
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <FontAwesomeIcon icon={faEdit} />
        )}
      </Button>
      <Modal show={open && !loading} onHide={handleClick}>
        <Modal.Body>
          {open && !loading && (
            <GradingModal
              initialValues={initialValues}
              onSubmit={(values) =>
                handleSubmit(id, values).then((res) => {
                  setOpen(false);
                  dispatch(setMyGrade(res.data));
                  return res;
                })
              }
              name={name}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Grade;
