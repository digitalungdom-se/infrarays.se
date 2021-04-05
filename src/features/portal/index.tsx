import ButtonGroup from "react-bootstrap/ButtonGroup";
import Center from "components/Center";
import Delete from "./Delete";
import Download from "./Download";
import FileChapters from "./FileChapters";
import Logo from "components/Logo";
import Logout from "./Logout";
import Progress from "./Progress";
import React from "react";
import ReactMarkdown from "react-markdown";
import References from "./References";
import StyledPlate from "components/Plate";
import Survey from "features/survey";
import { useTranslation } from "react-i18next";

const Hook = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <Center>
      <StyledPlate>
        <Logo center />
        <div>
          <h1 style={{ textAlign: "center" }}>{t("title")}</h1>
          <ReactMarkdown source={t("introduction") || ""} />
          <hr style={{ color: "#b8b8b8" }} />
        </div>
        <div>
          <FileChapters />
          <Survey />
          <References />
          <Progress />
          <div style={{ padding: "3rem 0" }}>
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
