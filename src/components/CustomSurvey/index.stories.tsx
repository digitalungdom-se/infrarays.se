import CustomSurvey from "./index";
import React from "react";

export default {
  title: "CustomSurvey",
};

const onSubmit = (): Promise<void> =>
  new Promise((res) => setInterval(res, 1000));

const config = [
  {
    type: "TEXT",
    maxLength: 100,
  },
];

export const Basic = (): React.ReactElement => (
  <CustomSurvey onSubmit={onSubmit} config={config} />
);
