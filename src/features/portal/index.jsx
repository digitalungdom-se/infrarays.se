import { ButtonGroup, ProgressBar } from "react-bootstrap";
import React, { useEffect } from "react";
import { appFailure, appSuccess } from "features/appSlice";
import { useDispatch, useSelector } from "react-redux";

import Alert from "react-bootstrap/Alert";
import Axios from "axios";
import Center from "components/Center";
import Chapters from "./Chapters";
import Delete from "./Delete";
import Download from "./Download";
import Logo from "components/Logo";
import Logout from "./Logout";
import ReactMarkdown from "react-markdown";
import StyledPlate from "components/Plate";
import { useTranslation } from "react-i18next";

const Hook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Axios.get("/application/@me/file")
      .then((res) => {
        dispatch(appSuccess(res));
      })
      .catch((err) => {
        if (err.json) {
          dispatch(appFailure());
        }
      });
  });

  const files = useSelector((state) => state.app?.files);

  // const progress = (files ? Object.keys(files).length : 0) + (survey ? 1 : 0);

  const { t } = useTranslation();
  // const { language } = i18n;
  // const t = translation[language];

  return (
    <Center noTop>
      <StyledPlate>
        <Logo center maxWidth="80%" />
        <div>
          <h1 style={{ textAlign: "center" }}>{t("title")}</h1>
          <ReactMarkdown source={t("introduction")} />
          {/* <ProgressBar
            label={`${(progress / 5) * 100}%`}
            variant="custom"
            now={(progress / 5) * 100}
          /> */}
          <hr styled="color:#b8b8b8" size="1" />
        </div>
        <div>
          <Chapters />
          <div style={{ padding: "20px 0" }}>
            {/* {progress === 5 && (
              <Alert variant="success">
                Din ansökan är fullständig och är mottagen för Rays.
              </Alert>
            )} */}
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
