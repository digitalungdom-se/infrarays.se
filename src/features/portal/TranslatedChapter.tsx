import { WithTranslation, withTranslation } from "react-i18next";

import Chapter from "components/Chapter";
import React from "react";

interface TranslatedChapterProps extends WithTranslation {
  type: string;
}

const TranslatedChapter: React.FC<TranslatedChapterProps> = ({
  t,
  children,
  type,
}) => (
  <Chapter
    key={type}
    title={t(`${type}.title`)}
    description={t(`${type}.description`)}
    subtitle={t(`${type}.subtitle`)}
  >
    {children}
  </Chapter>
);

export default withTranslation()(TranslatedChapter);
