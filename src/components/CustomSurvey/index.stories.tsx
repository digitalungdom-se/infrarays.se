import CustomSurvey from "./index";
import CustomSurveyForm from "./CustomSurveyForm";
import { CustomSurveyQuestion } from "types/survey";
import React from "react";

export default {
  title: "CustomSurvey",
};

const onSubmit = (): Promise<void> =>
  new Promise((res) => setInterval(res, 1000));

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

export const Accordion = (): React.ReactElement => (
  <CustomSurvey onSubmit={onSubmit} config={config} />
);

export const Form = (): React.ReactElement => (
  <CustomSurveyForm onSubmit={onSubmit} config={config} />
);
