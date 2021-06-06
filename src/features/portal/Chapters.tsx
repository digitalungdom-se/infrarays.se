import CustomSurveyAccordion from "components/CustomSurvey";
import { CustomSurveyQuestion } from "types/survey";
import React from "react";
import TranslatedChapter from "./TranslatedChapter";

type Chapter = FileChapter | SurveyChapter;

type FileChapter = {
  id: string;
  type: "FILES";
  upload: {
    multiple: number;
    accept: ".pdf";
  };
};

type SurveyChapter = {
  id: string;
  type: "SURVEY";
  questions: CustomSurveyQuestion[];
};

export interface ChaptersProps {
  chapters: Chapter[];
}

function Chapters({ chapters }: ChaptersProps): React.ReactElement {
  return (
    <>
      {chapters.map((chapter) => (
        <TranslatedChapter key={chapter.id} type={chapter.id}>
          {chapter.type === "SURVEY" && (
            <CustomSurveyAccordion
              config={chapter.questions}
              onSubmit={() => new Promise((res) => res())}
            />
          )}
        </TranslatedChapter>
      ))}
    </>
  );
}

export default Chapters;
