import { FileInfo, FileType, selectSingleFile } from "../portalSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Axios from "axios";
import { RootState } from "store";
import Upload from "components/portal/Upload";
import { uploadSuccess } from "../portalSlice";
import { useTranslation } from "react-i18next";

interface UploadHookProps {
  label?: string;
  accept?: string;
  fileType: FileType;
}

const UploadHook: React.FC<UploadHookProps> = ({ label, accept, fileType }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<any>();
  const dispatch = useDispatch();
  const fileInfo = useSelector((state: RootState) =>
    selectSingleFile(state, fileType)
  );
  const { t } = useTranslation();

  function handleChange(file: any, fileName: string) {
    if (file.size > 7 * 10 ** 6) {
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
      dispatch(uploadSuccess(res.data));
    });
  }

  return (
    <Upload
      label={label}
      accept={accept}
      onChange={handleChange}
      uploading={uploading}
      uploaded={fileInfo?.name || error?.fileName}
      // time={uploaded?.time}
      error={error?.msg}
    />
  );
};

export default UploadHook;