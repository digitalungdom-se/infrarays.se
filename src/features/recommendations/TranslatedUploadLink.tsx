import { Trans, withTranslation } from "react-i18next";

import React from "react";

const UploadLink = ({ code }: { code: string }) => (
  <a
    href={`/recommendation/${code}`}
    rel="noopewner noreferrer"
    target="_blank"
    style={{ color: "black" }}
  >
    <Trans i18nKey="Click to open link" />
  </a>
);

const TranslatedUploadLink = withTranslation()(UploadLink);

export default TranslatedUploadLink;
