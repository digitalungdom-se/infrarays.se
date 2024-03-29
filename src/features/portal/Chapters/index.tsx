import { WithTranslation, withTranslation } from "react-i18next";

import Chapter from "components/portal/Chapter";
import { FileType } from "../portalSlice";
import PortalSurvey from "../Survey";
import React from "react";
import References from "../References";
import Upload from "features/files/Upload";
import portal from "config/portal.json";

interface ChaptersProps extends WithTranslation {
  filesLoading?: boolean;
  referencesLoading?: boolean;
}

const Chapters: React.FC<ChaptersProps> = ({
  t,
  filesLoading,
  referencesLoading,
}): React.ReactElement => (
  <>
    {portal.chapters.map((chapter) => (
      <Chapter
        key={chapter.fileType}
        title={t(`${chapter.fileType}.title`)}
        description={t(`${chapter.fileType}.description`)}
        subtitle={t(`${chapter.fileType}.subtitle`)}
      >
        {chapter.upload && (
          <Upload
            accept={chapter.upload.accept}
            fileType={chapter.fileType as FileType}
            disabled={filesLoading}
            multiple={chapter.upload.multiple}
            me
          />
        )}
        {chapter.contactPeople && <References loading={referencesLoading} />}
        {chapter.survey && <PortalSurvey />}
      </Chapter>
    ))}
  </>
);
export default withTranslation()(Chapters);
