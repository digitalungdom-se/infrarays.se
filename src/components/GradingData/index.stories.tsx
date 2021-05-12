import GradingData from "./index";
import React from "react";

export default { title: "GradingData" };

export const Basic = (): React.ReactElement => (
  <GradingData
    applicationGrades={[
      {
        firstName: "Pieter",
        lastName: "Zeeman",
        cv: 4,
        coverLetter: 4,
        essays: 4,
        grades: 4,
        recommendations: 4,
        overall: 4,
        comment: ".",
      },
      {
        firstName: "Hendrik",
        lastName: "Lorentz",
        cv: 4,
        coverLetter: 4,
        essays: 4,
        grades: 4,
        recommendations: 4,
        overall: 4,
        comment: "",
      },
      {
        firstName: "Wilhelm",
        lastName: "Röntgen",
        cv: 4,
        coverLetter: 4,
        essays: 4,
        grades: 4,
        recommendations: 4,
        overall: 4,
        comment: `Längre kommentar.
            ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.
            ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.
            ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.
          `,
      },
    ]}
  />
);
