import CenterCard from "components/CenterCard";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Translation } from "react-i18next";

const GDPR = () => (
  <CenterCard maxWidth="600px" title="GDPR">
    <Translation i18nKey="GDPR">
      {(t) => <ReactMarkdown source={t("GDPR") || ""} />}
    </Translation>
  </CenterCard>
);

export default GDPR;
