import { CustomSurveyAnswer, CustomSurveyQuestion } from "types/survey";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CustomSurveyForm from "./CustomSurveyForm";
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledCard = styled(Card)`
  &.done {
    background: rgba(40, 167, 69, 0.1);
    border-color: rgb(40, 167, 69);
  }

  &.done .card-header {
    color: #155724;
    background-color: #d4edda;
  }

  &.done .card-header .btn {
    color: #155724;
  }
`;

interface CustomSurveyAccordionProps {
  config: CustomSurveyQuestion[];
  initialValues?: Record<string, CustomSurveyAnswer>;
  onSubmit: (surveyAnswers: CustomSurveyAnswer[]) => Promise<void>;
  disabled?: boolean;
}

const CustomSurveyAccordion = (
  props: CustomSurveyAccordionProps
): React.ReactElement => {
  const { t } = useTranslation();

  const done = props.initialValues ? "done" : "";

  return (
    <Accordion defaultActiveKey={done ? "1" : "0"} className={done}>
      <StyledCard className={done}>
        <Card.Header>
          <Accordion.Toggle eventKey="0" as={Button} variant="link">
            {t("Open (verb)")}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <CustomSurveyForm {...props} />
          </Card.Body>
        </Accordion.Collapse>
      </StyledCard>
    </Accordion>
  );
};

export default CustomSurveyAccordion;
