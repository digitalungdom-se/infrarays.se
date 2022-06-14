import { Trans, WithTranslation, withTranslation } from "react-i18next";

import React from "react";

const DevelopedBy: React.FC<WithTranslation> = () => (
  <div className="my-4">
    <Trans i18nKey="Developed by">
      Developed by
      <a
        href="https://www.digitalungdom.se/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Digital Ungdom
      </a>
    </Trans>
  </div>
);

export default withTranslation()(DevelopedBy);
