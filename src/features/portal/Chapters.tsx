import { Chapter } from "types/chapters";
import React from "react";
import RecommendationChapter from "./RecommendationChapter";
import Survey from "features/survey";
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
      return <Survey config={props.questions} />;
    case "FILES":
      return (
        <Upload
          accept={props.upload?.accept}
          type={props.id}
          multiple={props.upload?.multiple}
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
