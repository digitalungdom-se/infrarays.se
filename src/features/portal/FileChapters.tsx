import React from "react";
import TranslatedChapter from "./TranslatedChapter";
import Upload from "features/files/Upload";
import portal from "config/portal.json";

const FileChapters = (): React.ReactElement => (
  <>
    {portal.chapters
      .filter((chapter) => chapter.upload !== undefined)
      .map((chapter) => (
        <TranslatedChapter key={chapter.id} type={chapter.id}>
          <Upload
            accept={chapter.upload?.accept}
            id={chapter.id}
            multiple={chapter.upload?.multiple}
          />
        </TranslatedChapter>
      ))}
  </>
);
export default FileChapters;
