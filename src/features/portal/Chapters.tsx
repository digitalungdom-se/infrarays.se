import React from "react";
import TranslatedChapter from "./TranslatedChapter";
import Upload from "features/files/Upload";

type Chapter = FileChapter;

type FileChapter = {
  id: string;
  type: "FILES";
  upload: {
    multiple: number;
    accept: ".pdf";
  };
};

export interface ChaptersProps {
  chapters: Chapter[];
}

function Chapters({ chapters }: ChaptersProps): React.ReactElement {
  return (
    <>
      {chapters.map((chapter) => (
        <TranslatedChapter key={chapter.id} type={chapter.id}>
          {chapter.type === "FILES" && (
            <Upload
              accept={chapter.upload?.accept}
              fileType={chapter.id}
              multiple={chapter.upload?.multiple}
            />
          )}
        </TranslatedChapter>
      ))}
    </>
  );
}

export default Chapters;
