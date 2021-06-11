import { Chapter } from "types/chapters";
import React from "react";
import RecommendationChapter from "./RecommendationChapter";
import SurveyChapter from "./SurveyChapter";
import TranslatedChapter from "./TranslatedChapter";
import Upload from "features/files/Upload";

export interface ChaptersProps {
  chapters: Chapter[];
}

function CustomChapter(props: Chapter) {
  switch (props.type) {
    case "RECOMMENDATION_LETTER":
      return <RecommendationChapter {...props} />;
    case "SURVEY":
      return <SurveyChapter config={props.questions} />;
    case "FILES":
      return (
        <TranslatedChapter key={props.id} type={props.id}>
          <Upload
            accept={props.upload?.accept}
            id={props.id}
            multiple={props.upload?.multiple}
          />
        </TranslatedChapter>
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
