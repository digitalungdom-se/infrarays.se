import Alert from "react-bootstrap/Alert";
import ProgressBar from "react-bootstrap/ProgressBar";
import React from "react";
import { selectProgress } from "./portalSelectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useProgress from "hooks/useProgress";

const Progress = (): React.ReactElement => {
  const { t } = useTranslation();
  const progress = useProgress();
  return (
    <>
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
    </>
  );
};
export default Progress;
