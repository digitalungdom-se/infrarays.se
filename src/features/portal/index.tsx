import { ButtonGroup, ProgressBar } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Alert from "react-bootstrap/Alert";
import Center from "components/Center";
import Chapters from "./Chapters";
import Delete from "./Delete";
import Download from "./Download";
import Logo from "components/Logo";
import Logout from "./Logout";
import ReactMarkdown from "react-markdown";
import StyledPlate from "components/Plate";
import { getFiles } from "api/files";
import { selectProgress } from "./portalSlice";
import { setFiles } from "features/files/filesSlice";
import { useTranslation } from "react-i18next";

const Hook = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [filesLoading, setFilesLoading] = useState<boolean>(true);

  useEffect(() => {
    getFiles()
      .then((res) => {
        dispatch(setFiles(res));
        setFilesLoading(false);
      })
      .catch(console.error);
  }, []);
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
          <Chapters filesLoading={filesLoading} />
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
