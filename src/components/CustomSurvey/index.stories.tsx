import { CustomSurveyAnswer, CustomSurveyQuestion } from "types/survey";

import CustomSurvey from "./index";
import CustomSurveyForm from "./CustomSurveyForm";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "CustomSurvey",
};

const onSubmit = (values: Record<string, CustomSurveyAnswer>): Promise<void> =>
  new Promise((res) => {
    action("values")(values);
    setInterval(res, 1000);
  });

const config: CustomSurveyQuestion[] = [
  {
    type: "TEXT",
    maxLength: 256,
    id: "city",
  },
  {
    type: "TEXT",
    maxLength: 256,
    id: "school",
  },
  {
    type: "SELECT",
    options: ["MALE", "FEMALE", "OTHER", "UNDISCLOSED"],
    id: "gender",
  },
  {
    type: "RANGE",
    range: [1, 5],
    id: "applicationPortal",
  },
  {
    type: "RANGE",
    range: [1, 5],
    id: "applicationProcess",
  },
  {
    type: "TEXT",
    maxLength: 8192,
    id: "improvement",
  },
  {
    type: "TEXT",
    maxLength: 8192,
    id: "informant",
  },
];

const initialValues = {
  city: "Stockholm",
  school: "Nobel",
  gender: 0,
  applicationPortal: 5,
  applicationProcess: 3,
  improvement: "hmmm...",
  informant: "vem?",
};

export const Accordion = (): React.ReactElement => (
  <CustomSurvey onSubmit={onSubmit} config={config} />
);

export const Form = (): React.ReactElement => (
  <CustomSurveyForm
    onSubmit={onSubmit}
    config={config}
    initialValues={initialValues}
  />
);
