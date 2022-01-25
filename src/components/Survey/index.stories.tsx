import React from "react";
import Survey from "./index";

export default {
  title: "Survey",
};

const onSubmit = (): Promise<void> =>
  new Promise((res) => setInterval(res, 1000));

export const Basic = (): React.ReactElement => <Survey onSubmit={onSubmit} />;
