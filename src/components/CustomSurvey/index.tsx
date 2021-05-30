import { CustomSurveyAnswer, CustomSurveyQuestion } from "types/survey";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
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

  & .form-label {
    /* font-weight: 400; */
  }
`;

interface CustomSurveyAccordionProps {
  config: CustomSurveyQuestion[];
  initialValues?: CustomSurveyAnswer[];
  onSubmit: (surveyAnswers: CustomSurveyAnswer[]) => Promise<void>;
  disabled?: boolean;
}

function Question(props: CustomSurveyQuestion): React.ReactElement {
  const { t } = useTranslation();
  const label = <Form.Label>{t(`survey.${props.id}`)}</Form.Label>;
  switch (props.type) {
    case "RANGE":
      return <Form.Group>{label}</Form.Group>;
    case "TEXT":
      return (
        <Form.Group>
          {label}
          <Form.Control
            type="text"
            maxLength={props.maxLength}
            as={props.maxLength > 256 ? "textarea" : "input"}
          />
        </Form.Group>
      );
    case "SELECT":
      return (
        <Form.Group>
          <Form.Label>{t(`survey.${props.id}.label`)}</Form.Label>
          <Form.Control as="select" name="gender">
            <option value="select" disabled>
              {t("Choose an option")}
            </option>
            {props.options.map((option) => (
              <option value={option} key={option}>
                {t(`survey.${props.id}.options.${option}`)}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      );
    default:
      return <Form.Group>{label}</Form.Group>;
  }
}

const CustomSurveyAccordion = ({
  config,
  onSubmit,
  disabled,
  initialValues,
}: CustomSurveyAccordionProps): React.ReactElement => {
  const { t } = useTranslation();

  const done = initialValues ? "done" : "";
  const form = config.map((question) => (
    <Question key={question.id} {...question} />
  ));

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
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {form}
            </form>
          </Card.Body>
        </Accordion.Collapse>
      </StyledCard>
    </Accordion>
  );
};

export default CustomSurveyAccordion;
