import { CustomSurveyAnswer, CustomSurveyQuestion } from "types/survey";
import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Question from "./CustomSurveyQuestion";
import Spinner from "react-bootstrap/Spinner";
import { useTranslation } from "react-i18next";

export interface CustomSurveyFormProps {
  config: CustomSurveyQuestion[];
  initialValues?: Record<string, CustomSurveyAnswer>;
  onSubmit: (values: Record<string, CustomSurveyAnswer>) => Promise<void>;
  disabled?: boolean;
}

function CustomSurveyForm({
  config,
  initialValues,
  onSubmit,
  disabled,
}: CustomSurveyFormProps): React.ReactElement {
  const questions = config.map((question) => (
    <Question
      key={question.id}
      question={question}
      value={initialValues?.[question.id]}
    />
  ));
  const [isSubmitting, setSubmitting] = useState(false);
  const { t } = useTranslation();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const values: Record<string, CustomSurveyAnswer> = {};
        config.forEach(({ id }) => (values[id] = target[id].value));
        setSubmitting(true);
        onSubmit(values).then(() => setSubmitting(false));
      }}
    >
      {questions}
      <Button type="submit" disabled={isSubmitting || disabled}>
        {disabled ? (
          t("Application has closed")
        ) : isSubmitting ? (
          <>
            <Spinner animation="border" size="sm" /> {t("Saving answers")}
          </>
        ) : (
          t("Save answers")
        )}
      </Button>
    </form>
  );
}

export default CustomSurveyForm;
