import { Button, Spinner } from "react-bootstrap";
import React, { useState } from "react";

import CSS from "csstype";
import { downloadFullPDF } from "api/files";
import { useTranslation } from "react-i18next";

interface DownloadProps {
  style: CSS.Properties;
}

const Download = ({ style }: DownloadProps): React.ReactElement => {
  const [downloading, setDownload] = useState(false);
  const { t } = useTranslation();
  return (
    <Button
      style={style}
      onClick={() => {
        setDownload(true);
        downloadFullPDF().then(() => setDownload(false));
      }}
      disabled={downloading}
    >
      {downloading ? (
        <span>
          <Spinner animation="border" size="sm" />{" "}
          {t("Downloading application")}
        </span>
      ) : (
        t("Download application")
      )}
    </Button>
  );
};

export default Download;
