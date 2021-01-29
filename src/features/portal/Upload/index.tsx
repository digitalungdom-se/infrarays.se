import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Axios from "axios";
import Upload from "components/portal/Upload";
import { uploadSuccess } from "features/appSlice";
import { useTranslation } from "react-i18next";

interface UploadHookProps {
  label?: string;
  accept?: string;
  fileType: string;
}

const UploadHook: React.FC<UploadHookProps> = ({ label, accept, fileType }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<any>();
  const dispatch = useDispatch();
  const uploaded: any = useSelector<any>((state) => state.app.files[fileType]);
  const { t } = useTranslation();

  function handleChange(file: any, fileName: string) {
    if (file.size > 7 * 10 ** 6) {
      setError({ msg: t("too large"), fileName });
      return;
    }
    setUploading(true);
    const form = new FormData();
    form.append("file", file, fileName);
    Axios({
      method: "POST",
      url: `application/@me/file/${fileType.toUpperCase()}`,
      headers: { "Content-Type": "multipart/form-data" },
      data: form,
    }).then((res) => {
      setUploading(false);
      dispatch(uploadSuccess({ fileName, fileType }));
      // if (res.type === "success") {
      //   dispatch(uploadSuccess({ fileName, fileType }));
      // } else {
      //   res.json = true;
      //   throw res;
      // }
    });
    // .catch((err) => {
    //   if (err.json) {
    //     setError({ msg: err?.errors[0].msg, fileName });
    //   }
    // });
  }

  return (
    <Upload
      label={label}
      accept={accept}
      onChange={handleChange}
      uploading={uploading}
      uploaded={uploaded?.name || error?.fileName}
      // time={uploaded?.time}
      error={error?.msg}
    />
  );
};

export default UploadHook;
