import GradingModal from "./index";
import React from "react";
import { action } from "@storybook/addon-actions";

export default { title: "GradingModal" };

export const Basic = (): React.ReactElement => (
  <GradingModal
    name="Douglas Bengtsson"
    onSubmit={(values) =>
      new Promise(() => setInterval(() => action("submit")(values), 1000))
    }
  />
);
