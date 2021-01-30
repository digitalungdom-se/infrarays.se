import { WithTranslation, withTranslation } from "react-i18next";

import Chapter from "components/portal/Chapter";
import { FileType } from "../portalSlice";
import PortalSurvey from "../Survey";
import React from "react";
import References from "../References";
import Upload from "../Upload";
import portal from "config/portal.json";

const Chapters: React.FC<WithTranslation> = ({ t }): React.ReactElement => (
  <>
    {portal.chapters.map((chapter) => (
      <Chapter
        key={chapter.title}
        title={t(`${chapter.fileType}.title`)}
        description={t(`${chapter.fileType}.description`)}
        subtitle={t(`${chapter.fileType}.subtitle`)}
      >
        {chapter.upload && (
          <Upload
            label={t(`${chapter.fileType}.upload.label`)}
            accept={chapter.upload.accept}
            fileType={chapter.fileType as FileType}
          />
        )}
        {chapter.contactPeople && <References />}
        {/* {chapter.survey && <PortalSurvey done={survey !== undefined} />} */}
      </Chapter>
    ))}
  </>
);
export default withTranslation()(Chapters);
