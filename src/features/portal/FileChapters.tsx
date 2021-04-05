import { FileType } from "types/files";
import React from "react";
import TranslatedChapter from "./TranslatedChapter";
import Upload from "features/files/Upload";
import portal from "config/portal.json";
import { useFiles } from "features/files/filesHooks";

const FileChapters = (): React.ReactElement[] => {
  const { loading } = useFiles();
  return portal.chapters
    .filter((chapter) => chapter.upload !== undefined)
    .map((chapter) => (
      <TranslatedChapter key={chapter.fileType} type={chapter.fileType}>
        <Upload
          accept={chapter.upload?.accept}
          fileType={chapter.fileType as FileType}
          disabled={loading}
          multiple={chapter.upload?.multiple}
        />
      </TranslatedChapter>
    ));
};
export default FileChapters;
