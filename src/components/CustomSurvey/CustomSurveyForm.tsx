import { CustomSurveyAnswer, CustomSurveyQuestion } from "types/survey";

import Question from "./CustomSurveyQuestion";
import React from "react";

interface CustomSurveyFormProps {
  config: CustomSurveyQuestion[];
  initialValues?: CustomSurveyAnswer[];
  onSubmit: (surveyAnswers: CustomSurveyAnswer[]) => Promise<void>;
  disabled?: boolean;
}

function CustomSurveyForm({
  config,
}: CustomSurveyFormProps): React.ReactElement {
  const questions = config.map((question) => (
    <Question key={question.id} {...question} />
  ));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {questions}
    </form>
  );
}

export default CustomSurveyForm;
