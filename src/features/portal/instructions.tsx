import React from "react";

import Center from "components/Center";
import Logo from "components/Logo";
import ReactMarkdown from "react-markdown";
import StyledPlate from "components/Plate";
import { useTranslation } from "react-i18next";
import portal from "config/portal.json";
import Chapter from "components/portal/Chapter";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ApplicationInstructions = () => {
  const { t } = useTranslation();

  return (
    <Center>
      <StyledPlate>
        <Logo center />
        <div>
          <h1 style={{ textAlign: "center" }}>
            {t("title")} {new Date().getFullYear()}
          </h1>
          <ReactMarkdown source={t("introduction") || ""} />
          <hr style={{ color: "#b8b8b8" }} />
        </div>
        <div>
          {portal.chapters.map((chapter) => (
            <Chapter
              key={chapter.fileType}
              title={t(`${chapter.fileType}.title`)}
              description={t(`${chapter.fileType}.description`)}
              subtitle={t(`${chapter.fileType}.subtitle`)}
            ></Chapter>
          ))}
          <Link to="/login">
            <Button
              size="lg"
              variant="custom"
              type="submit"
              style={{
                width: "100%",
              }}
            >
              {t("Login")}
            </Button>
          </Link>
        </div>
      </StyledPlate>
    </Center>
  );
};

export default ApplicationInstructions;
