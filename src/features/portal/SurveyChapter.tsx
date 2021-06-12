import { CustomSurveyQuestion } from "types/survey";
import React from "react";
import Survey from "features/survey";

interface SurveyChapterProps {
  config: CustomSurveyQuestion[];
}

const SurveyChapter = ({ config }: SurveyChapterProps): React.ReactElement => (
  <Survey config={config} />
);

export default SurveyChapter;
