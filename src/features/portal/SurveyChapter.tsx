import { CustomSurveyQuestion } from "types/survey";
import React from "react";
import Survey from "features/survey";
import TranslatedChapter from "./TranslatedChapter";

interface SurveyChapterProps {
  config: CustomSurveyQuestion[];
}

const SurveyChapter = ({ config }: SurveyChapterProps): React.ReactElement => (
  <TranslatedChapter type="SURVEY">
    <Survey config={config} />
  </TranslatedChapter>
);

export default SurveyChapter;
