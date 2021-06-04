import { CustomSurveyAnswer, CustomSurveyQuestion } from "types/survey";

import Form from "react-bootstrap/Form";
import React from "react";
import { useTranslation } from "react-i18next";

interface QuestionProps {
  question: CustomSurveyQuestion;
  value: CustomSurveyAnswer;
}

function Question({ question, value }: QuestionProps): React.ReactElement {
  const { t } = useTranslation();
  switch (question.type) {
    case "RANGE":
      return (
        <Form.Group>
          <Form.Label>
            {t(`chapters.SURVEY.questions.${question.id}.label`)}
          </Form.Label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-secondary">
              {t(`chapters.SURVEY.questions.${question.id}.low`)}
            </span>
            {[...Array(question.range[1] - question.range[0] + 1)].map(
              (_, i) => (
                <Form.Check
                  key={question.id + i}
                  inline
                  name={question.id}
                  type="radio"
                  label={question.range[0] + i}
                  value={question.range[0] + i}
                  defaultChecked={question.range[0] + i === value}
                  required
                />
              )
            )}
            <span className="text-secondary">
              {t(`chapters.SURVEY.questions.${question.id}.high`)}
            </span>
          </div>
        </Form.Group>
      );
    case "TEXT":
      return (
        <Form.Group>
          <Form.Label>
            {t(`chapters.SURVEY.questions.${question.id}`)}
          </Form.Label>
          <Form.Control
            type="text"
            maxLength={question.maxLength}
            as={question.maxLength > 256 ? "textarea" : "input"}
            defaultValue={value}
            required
            name={question.id}
          />
        </Form.Group>
      );
    case "SELECT":
      return (
        <Form.Group>
          <Form.Label>
            {t(`chapters.SURVEY.questions.${question.id}.label`)}
          </Form.Label>
          <Form.Control as="select" name={question.id} required>
            <option value="" disabled selected={!value} hidden>
              {t("Choose an option")}
            </option>
            {question.options.map((option, i) => (
              <option value={option} key={option} selected={i === value}>
                {t(
                  `chapters.SURVEY.questions.${question.id}.options.${option}`
                )}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      );
    default:
      return <></>;
  }
}
export default Question;
