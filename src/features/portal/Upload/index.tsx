import {
  FileInfo,
  FileType,
  deleteFileSuccess,
  selectSingleFileByFileType,
} from "../portalSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Axios from "axios";
import FileSaver from "file-saver";
import { RootState } from "store";
import Upload from "components/portal/Upload";
import { replaceFile } from "../portalSlice";
import { useTranslation } from "react-i18next";

interface UploadHookProps {
  label?: string;
  accept?: string;
  fileType: FileType;
  disabled?: boolean;
}

const UploadHook: React.FC<UploadHookProps> = ({
  disabled,
  label,
  accept,
  fileType,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<any>();
  const dispatch = useDispatch();
  const fileInfo = useSelector((state: RootState) =>
    selectSingleFileByFileType(state, fileType)
  );
  const { t } = useTranslation();

  function handleChange(file: any, fileName: string) {
    if (file.size > 5 * 10 ** 6) {
      setError({ msg: t("too large"), fileName });
      return;
    }
    setUploading(true);
    const form = new FormData();
    form.append("file", file, fileName);
    Axios.post<FileInfo>(`application/@me/file/${fileType}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setUploading(false);
      dispatch(replaceFile(res.data));
    });
  }

  const handleDownload = () =>
    Axios.get(`application/@me/file/${fileInfo?.id}`, {
      responseType: "blob",
    }).then((res) => {
      const utf8FileName = res.headers["content-disposition"].split(
        "filename*=UTF-8''"
      )[1];
      const decodedName = decodeURIComponent(utf8FileName);
      const normalName = res.headers["content-disposition"].split(
        "filename="
      )[1];
      FileSaver.saveAs(
        res.data,
        utf8FileName === undefined
          ? normalName.substring(1, normalName.length - 1)
          : decodedName.substring(1, decodedName.length - 1)
      );
    });

  const handleDelete = () =>
    Axios.delete(`/application/@me/file/${fileInfo?.id}`).then(() => {
      dispatch(deleteFileSuccess((fileInfo as FileInfo).id));
    });

  const handleCancel = () => setError(null);

  return (
    <Upload
      label={label}
      accept={accept}
      onChange={handleChange}
      uploading={uploading}
      uploaded={error?.fileName || fileInfo?.name}
      onCancel={handleCancel}
      onDownload={handleDownload}
      error={error ? error.msg : undefined}
      onDelete={handleDelete}
      disabled={disabled}
      uploadLabel={t("Choose file")}
    />
  );
};

export default UploadHook;
