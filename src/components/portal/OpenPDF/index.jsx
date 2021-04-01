import { Button, Spinner } from "react-bootstrap";
import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export function showFile(blob, name, callback) {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const newBlob = new Blob([blob], { type: "application/pdf" });

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob, name);
    return;
  }

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob);
  // const isFirefox = typeof InstallTrigger !== "undefined";
  // if (!isFirefox) {
  window.open(data);
  // } else {
  //   const link = document.createElement("a");
  //   link.href = data;
  //   link.target = "_blank";
  //   link.download = name;
  //   link.click();
  // }
  setTimeout(function () {
    // For Firefox it is necessary to delay revoking the ObjectURL
    // document.removeChild(link);
    window.URL.revokeObjectURL(data);
  }, 100);
  if (callback) callback();
}

const OpenPDF = ({ url, children, variant = "primary" }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  return (
    <Button
      variant={variant}
      onClick={() => {
        setLoading(true);
        setTimeout(() => {
          axios
            .get(url, { responseType: "blob" })
            .then((res) => {
              const name = res.headers["content-disposition"].split(
                "filename="
              )[1];
              showFile(res.data, name, setLoading(false));
            })
            .catch(() => {
              toast.error(t("Couldnt get file"));
              setLoading(false);
            });
          // TODO Add catch
        }, 1000);
      }}
      disabled={loading}
    >
      {loading ? <Spinner animation="border" size="sm" /> : children}
    </Button>
  );
};

export default OpenPDF;
