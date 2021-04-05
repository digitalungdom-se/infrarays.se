import { FileType } from "types/files";
import React from "react";
import TranslatedChapter from "./TranslatedChapter";
import Upload from "features/files/Upload";
import portal from "config/portal.json";

const FileChapters = (): React.ReactElement[] =>
  portal.chapters
    .filter((chapter) => chapter.upload !== undefined)
    .map((chapter) => (
      <TranslatedChapter key={chapter.fileType} type={chapter.fileType}>
        <Upload
          accept={chapter.upload?.accept}
          fileType={chapter.fileType as FileType}
          multiple={chapter.upload?.multiple}
        />
      </TranslatedChapter>
    ));
export default FileChapters;
