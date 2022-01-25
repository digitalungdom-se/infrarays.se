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
    title={t(`chapters.${type}.title`)}
    description={t(`chapters.${type}.description`)}
    subtitle={t(`chapters.${type}.subtitle`)}
  >
    {children}
  </Chapter>
);

export default withTranslation()(TranslatedChapter);
