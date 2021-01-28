import { ButtonGroup, ProgressBar } from "react-bootstrap";
import React, { useEffect } from "react";
import { appFailure, appSuccess } from "features/appSlice";
import { useDispatch, useSelector } from "react-redux";

import Alert from "react-bootstrap/Alert";
import Center from "components/Center";
import Chapter from "components/portal/Chapter";
import Delete from "./Delete";
import Download from "./Download";
import Logo from "components/Logo";
import Logout from "./Logout";
import PortalSurvey from "./Survey";
import ReactMarkdown from "react-markdown";
import References from "./References";
import StyledPlate from "components/Plate";
import Upload from "./Upload";
import portal from "config/portal.json";
import { useTranslation } from "react-i18next";

const Hook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = async () =>
      fetch("/api/auth", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.type === "fail") {
            res.json = true;
            throw res;
          } else dispatch(appSuccess(res));
        })
        .catch((err) => {
          if (err.json) {
            dispatch(appFailure());
          }
        });
    data();
  });

  const files = useSelector((state) => state.app?.files);
  const survey = useSelector((state) => state.app?.survey);
  const progress = (files ? Object.keys(files).length : 0) + (survey ? 1 : 0);

  const { t } = useTranslation();
  // const { language } = i18n;
  // const t = translation[language];

  const Chapters = () =>
    portal.chapters.map((chapter) => (
      <Chapter
        key={chapter.title}
        title={t(`${chapter.fileType}.title`)}
        description={t(`${chapter.fileType}.description`)}
        subtitle={t(`${chapter.fileType}.subtitle`)}
      >
        {chapter.upload && (
          <Upload
            label={t(`${chapter.fileType}.upload.label`)}
            accept={chapter.upload.accept}
            fileType={chapter.fileType}
          />
        )}
        {chapter.contactPeople && <References />}
        {chapter.survey && <PortalSurvey done={survey !== undefined} />}
      </Chapter>
    ));

  return (
    <Center noTop>
      <StyledPlate>
        <Logo center maxWidth="80%" />
        <div>
          <h1 style={{ textAlign: "center" }}>{t("title")}</h1>
          <ReactMarkdown source={t("introduction")} />
          <ProgressBar
            label={`${(progress / 5) * 100}%`}
            variant="custom"
            now={(progress / 5) * 100}
          />
          <hr styled="color:#b8b8b8" size="1" />
        </div>
        <div>
          <Chapters />
          <div style={{ padding: "20px 0" }}>
            {progress === 5 && (
              <Alert variant="success">
                Din ansökan är fullständig och är mottagen för Rays.
              </Alert>
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
