import { Button, Spinner } from "react-bootstrap";
import React from "react";

import { useTranslation } from "react-i18next";
import { useLazyGetApplicationPDFQuery } from "services/file";
import FileSaver from "file-saver";

const Download = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  const [downloadApplicationPDF, { isLoading: downloading }] =
    useLazyGetApplicationPDFQuery();
  const { t } = useTranslation();
  return (
    <Button
      onClick={() =>
        downloadApplicationPDF().then((res) => {
          if (res.data) FileSaver.saveAs(...res.data);
        })
      }
      disabled={downloading}
      className={className}
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
