import { WithTranslation, withTranslation } from "react-i18next";

import CenterCard from "components/CenterCard";
import React from "react";
import ReactMarkdown from "react-markdown";

type GDPRPRops = WithTranslation;

const GDPR = ({ t }: GDPRPRops) => (
  <CenterCard maxWidth="600px" title="GDPR">
    <ReactMarkdown source={t("GDPR") || ""} />
  </CenterCard>
);

export default withTranslation()(GDPR);
