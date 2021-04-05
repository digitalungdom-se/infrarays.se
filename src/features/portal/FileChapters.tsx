import { WithTranslation, withTranslation } from "react-i18next";

import Chapter from "components/Chapter";
import { FileType } from "types/files";
import React from "react";
import Upload from "features/files/Upload";
import portal from "config/portal.json";
import { useFiles } from "features/files/filesHooks";

const Chapters = ({ t }: WithTranslation): React.ReactElement => {
  const { loading } = useFiles();
  return (
    <>
      {portal.chapters
        .filter((chapter) => chapter.upload !== undefined)
        .map((chapter) => (
          <Chapter
            key={chapter.fileType}
            title={t(`${chapter.fileType}.title`)}
            description={t(`${chapter.fileType}.description`)}
            subtitle={t(`${chapter.fileType}.subtitle`)}
          >
            <Upload
              accept={chapter.upload?.accept}
              fileType={chapter.fileType as FileType}
              disabled={loading}
              multiple={chapter.upload?.multiple}
            />
          </Chapter>
        ))}
    </>
  );
};
export default withTranslation()(Chapters);
