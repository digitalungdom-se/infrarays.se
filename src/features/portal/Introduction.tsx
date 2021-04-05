import { WithTranslation, withTranslation } from "react-i18next";

import React from "react";
import ReactMarkdown from "react-markdown";

const Introduction = ({ t }: WithTranslation) => (
  <div>
    <h1 style={{ textAlign: "center" }}>{t("title")}</h1>
    <ReactMarkdown source={t("introduction") || ""} />
    <hr style={{ color: "#b8b8b8" }} />
  </div>
);
export default withTranslation()(Introduction);
