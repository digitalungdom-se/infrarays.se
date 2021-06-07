import CustomSurveyAccordion from "components/CustomSurvey";
import { CustomSurveyQuestion } from "types/survey";
import React from "react";
import RecommendationChapter from "./RecommendationChapter";
import TranslatedChapter from "./TranslatedChapter";

type Chapter = FileChapter | SurveyChapter | ReferenceChapter;

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

type ReferenceChapter = {
  id: string;
  type: "RECOMMENDATION_LETTER";
  max: 3;
};

export interface ChaptersProps {
  chapters: Chapter[];
}

function CustomChapter(props: Chapter) {
  switch (props.type) {
    case "RECOMMENDATION_LETTER":
      return <RecommendationChapter {...props} />;
    case "SURVEY":
      return (
        <CustomSurveyAccordion
          config={props.questions}
          onSubmit={() => new Promise((res) => res())}
        />
      );
    default:
      return <></>;
  }
}

function Chapters({ chapters }: ChaptersProps): React.ReactElement {
  return (
    <>
      {chapters.map((chapter) => (
        <TranslatedChapter key={chapter.id} type={chapter.id}>
          <CustomChapter {...chapter} />
        </TranslatedChapter>
      ))}
    </>
  );
}

export default Chapters;
