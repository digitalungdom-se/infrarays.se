import React from "react";
import Survey from "features/survey";
import TranslatedChapter from "./TranslatedChapter";

const SurveyChapter = (): React.ReactElement => (
  <TranslatedChapter type="SURVEY">
    <Survey />
  </TranslatedChapter>
);

export default SurveyChapter;
