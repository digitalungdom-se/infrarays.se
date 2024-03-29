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
    new Promise((res) => setTimeout(() => res(), 1000));

  const confirmDelete = () =>
    new Promise<Promise<void> | undefined>(() => {
      const result = window.confirm(
        "Är du säker på att du vill ta bort filen? Det går inte att ångra."
      );
      if (result) return onChangeDelay();
      return new Promise<void>((res) => {
        res();
      });
    });

  const handleCancel = () => setUploaded("");

  return (
    <Upload
      error={uploaded.split(".png").length > 1 ? "Fel" : undefined}
      onCancel={handleCancel}
      onChange={handleChange}
      uploading={uploading}
      uploaded={uploaded}
      onDelete={confirmDelete}
      onDownload={onChangeDelay}
    />
  );
};

export const UploadedHook = () => {
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
    new Promise((res) => setTimeout(() => res(), 1000));
  const handleCancel = () => setUploaded("");

  return (
    <Upload
      uploaded="1289377128371298739812793871297392173987129371982379827319879387.pdf"
      disabled
      onDownload={onChangeDelay}
      onDelete={onChangeDelay}
    />
  );
};

export const ErrorStatic = () => (
  <Upload
    uploaded="file.pdf"
    error="Fel"
    disabled
    onCancel={() => action("canceled")("canceled")}
  />
);
