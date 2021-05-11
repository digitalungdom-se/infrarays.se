import GradingData from "./index";
import React from "react";

export default { title: "GradingData" };

export const Basic = (): React.ReactElement => (
  <GradingData
    applicationGrades={[
      {
        name: "Pieter Zeeman",
        cv: 4,
        coverLetter: 4,
        essay: 4,
        grade: 4,
        recommendation: 4,
        overall: 4,
        comment: ".",
      },
      {
        name: "Hendrik Lorentz",
        cv: 4,
        coverLetter: 4,
        essay: 4,
        grade: 4,
        recommendation: 4,
        overall: 4,
        comment: "",
      },
      {
        name: "Wilhelm Röntgen",
        cv: 4,
        coverLetter: 4,
        essay: 4,
        grade: 4,
        recommendation: 4,
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
