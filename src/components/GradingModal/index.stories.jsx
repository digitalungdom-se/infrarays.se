import React from "react";

import { action } from "@storybook/addon-actions";
import GradingModal from "./index";

export default { title: "GradingModal" };

export const Basic = () => (
  <div
    style={{
      padding: 50,
      width: 400,
    }}
  >
    <GradingModal
      name="Douglas Bengtsson"
      onSubmit={(values, { setSubmitting, setErrors }) => {
        const errors = {};
        [
          "cv",
          "coverLetter",
          "essay",
          "grades",
          "recommendation",
          "overall",
        ].forEach((key) => {
          if (values[key] === 0) errors[key] = true;
        });
        if (errors) {
          action("errors")(errors);
          setErrors(errors);
        }
        setSubmitting(true);
        setTimeout(() => {
          setSubmitting(false);
        }, 1000);
        action("submit")(values);
      }}
    />
  </div>
);
