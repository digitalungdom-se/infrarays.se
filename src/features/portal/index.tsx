import { ButtonGroup, ProgressBar } from "react-bootstrap";

import Alert from "react-bootstrap/Alert";
import Center from "components/Center";
import Delete from "./Delete";
import Download from "./Download";
import FileChapters from "./FileChapters";
import Logo from "components/Logo";
import Logout from "./Logout";
import React from "react";
import ReactMarkdown from "react-markdown";
import References from "./References";
import StyledPlate from "components/Plate";
import Survey from "./Survey";
import { selectProgress } from "./portalSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Hook = (): React.ReactElement => {
  const progress = useSelector(selectProgress);
  const { t } = useTranslation();

  return (
    <Center>
      <StyledPlate>
        <Logo center />
        <div>
          <h1 style={{ textAlign: "center" }}>{t("title")}</h1>
          <ReactMarkdown source={t("introduction") || ""} />
          <ProgressBar
            label={`${(progress / 5) * 100}%`}
            variant="custom"
            now={(progress / 5) * 100}
          />
          {progress === 5 && (
            <Alert variant="success" style={{ marginTop: 10 }}>
              {t("Application complete")}
            </Alert>
          )}
          <hr style={{ color: "#b8b8b8" }} />
        </div>
        <div>
          <FileChapters />
          <Survey />
          <References />
          <div style={{ padding: "20px 0" }}>
            {progress === 5 && (
              <Alert variant="success">{t("Application complete")}</Alert>
            )}
            <ButtonGroup>
              <Delete />
              <Logout />
            </ButtonGroup>
            <Download style={{ float: "right" }} />
          </div>
        </div>
      </StyledPlate>
    </Center>
  );
};

export default Hook;
