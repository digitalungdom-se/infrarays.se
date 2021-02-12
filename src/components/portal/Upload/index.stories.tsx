import React, { useState } from "react";

import Upload from "./index";
import { action } from "@storybook/addon-actions";

export default {
  title: "Upload",
};

export const TooLong = () => (
  <Upload uploaded="1289377128371298739812793871297392173987129371982379827319879387.pdf" />
);

export const Error = () => <Upload uploaded="file.pdf" error="Fel" />;

export const UploadHook = () => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState("");

  function handleChange(file: any, fileName: string) {
    action("file-change")(file, fileName);
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(fileName);
    }, 1000);
  }

  const onChangeDelay: () => Promise<void> = () =>
    new Promise((res, rej) => setTimeout(() => res(), 1000));

  return (
    <Upload
      // title="Ladda upp personligt brev"
      onChange={handleChange}
      uploading={uploading}
      uploaded={uploaded}
      onDelete={onChangeDelay}
      onDownload={onChangeDelay}
    />
  );
};
