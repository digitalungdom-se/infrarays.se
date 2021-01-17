import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

const OpenPDF = ({ url, children }) => {
  const [loading, setLoading] = useState(false);
  function showFile(blob) {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    const newBlob = new Blob([blob], { type: "application/pdf" });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    window.open(data);
    // const link = document.createElement('a');
    // link.href = data;
    // link.target = '_blank';
    // // link.download = 'file.pdf';
    // link.click();
    // setTimeout(function() {
    //   // For Firefox it is necessary to delay revoking the ObjectURL
    //   window.URL.revokeObjectURL(data);
    // }, 100);
    setLoading(false);
  }

  return (
    <Button
      variant="primary"
      onClick={() => {
        setLoading(true);
        setTimeout(() => {
          fetch(url)
            .then((r) => r.blob())
            .then(showFile);
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
