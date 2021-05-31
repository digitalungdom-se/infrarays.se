import { CustomSurveyQuestion } from "types/survey";
import Form from "react-bootstrap/Form";
import React from "react";
import { useTranslation } from "react-i18next";

function Question(props: CustomSurveyQuestion): React.ReactElement {
  const { t } = useTranslation();
  switch (props.type) {
    case "RANGE":
      return (
        <Form.Group>
          <Form.Label>{t(`survey.${props.id}.label`)}</Form.Label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-secondary">
              {t(`survey.${props.id}.low`)}
            </span>
            {[...Array(props.range[1] - props.range[0] + 1)].map((_, i) => (
              <Form.Check
                key={props.id + i}
                inline
                name={props.id}
                type="radio"
                label={props.range[0] + i}
                value={props.range[0] + i}
              />
            ))}
            <span className="text-secondary">
              {t(`survey.${props.id}.high`)}
            </span>
          </div>
        </Form.Group>
      );

    case "TEXT":
      return (
        <Form.Group>
          <Form.Label>{t(`survey.${props.id}`)}</Form.Label>
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
            <option value="select" disabled selected>
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
      return <></>;
  }
}
export default Question;
