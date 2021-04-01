import { Button, Spinner } from "react-bootstrap";
import React, { useState } from "react";

import Axios from "api/axios";
import CSS from "csstype";
import FileSaver from "file-saver";
import { useTranslation } from "react-i18next";

interface DownloadProps {
  style: CSS.Properties;
}

const Download = ({ style }: DownloadProps) => {
  const [downloading, setDownload] = useState(false);
  const { t } = useTranslation();
  return (
    <Button
      style={style}
      onClick={() => {
        setDownload(true);
        Axios.get("/application/@me/pdf", { responseType: "blob" }).then(
          (res) => {
            setDownload(false);
            FileSaver.saveAs(
              res.data,
              res.headers["content-disposition"].split("filename=")[1]
            );
          }
        );
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
