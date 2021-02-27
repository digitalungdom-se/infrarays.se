import { Button, Modal, Spinner } from "react-bootstrap";
import { Grading, selectMyGrading, setGrades, setMyGrade } from "../adminSlice";
import GradingModal, { GradeFormValues } from "components/GradingModal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "store";
import axios from "axios";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface GradeProps {
  id: string;
}

const handleSubmit = (id: string, values: GradeFormValues) =>
  axios.post(`/application/${id}/grade`, values);

const Grade: React.FC<GradeProps> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const myGrading = useSelector((state: RootState) =>
    selectMyGrading(state, id)
  );
  const handleClick = () => {
    setOpen(!open);
    if (!open && myGrading === undefined) {
      setLoading(true);
      axios.get<Grading[]>(`/application/${id}/grade`).then((res) => {
        dispatch(setGrades({ grades: res.data, applicantId: id }));
        setLoading(false);
      });
    }
  };

  return (
    <>
      <Button onClick={handleClick}>
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
              initialValues={myGrading}
              onSubmit={(values) =>
                handleSubmit(id, values).then((res) => {
                  setOpen(false);
                  dispatch(setMyGrade(res.data));
                  return res;
                })
              }
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Grade;
