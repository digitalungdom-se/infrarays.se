import { Button, Modal, Spinner } from "react-bootstrap";
import React, { useState } from "react";
import { getGradesByApplicant, postApplicationGrade } from "api/admin";
import { selectMyGrading, setGrades, setMyGrade } from "./adminSlice";
import { useDispatch, useSelector } from "react-redux";

import { ButtonProps } from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GradingModal from "components/GradingModal";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { usePostApplicationGradeMutation } from "services/application";

interface GradeProps {
  id: string;
  variant?: ButtonProps["variant"];
}

const Grade: React.FC<GradeProps> = ({ id, variant = "primary" }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const dispatch = useDispatch();
  // const gradingData = useSelector(selectMyGrading(id));
  const handleClick = () => {
    setOpen(!open);
    // if (!open && gradingData === undefined) {
    //   setLoading(true);
    //   getGradesByApplicant(id).then((grades) => {
    //     dispatch(setGrades({ grades, applicantId: id }));
    //     setLoading(false);
    //   });
    // }
  };
  // let name, initialValues;
  // if (gradingData) {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { firstName, lastName, ...myGrading } = gradingData;
  //   name = firstName + " " + lastName;
  //   initialValues = myGrading;
  // }

  const [postApplicationGrade] = usePostApplicationGradeMutation();

  return (
    <>
      <Button onClick={handleClick} variant={variant}>
        {/* {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <FontAwesomeIcon icon={faEdit} />
        )} */}
        open
      </Button>
      <Modal show={open && !loading} onHide={handleClick}>
        <Modal.Body>
          {open && !loading && (
            <GradingModal
              // initialValues={initialValues}
              onSubmit={
                (values) =>
                  postApplicationGrade({ applicantID: id, form: values })
                // postApplicationGrade(id, values).then((res) => {
                //   setOpen(false);
                //   dispatch(setMyGrade(res));
                // })
              }
              // name={name}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Grade;
