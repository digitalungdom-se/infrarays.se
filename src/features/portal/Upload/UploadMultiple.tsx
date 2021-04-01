import {
  FileInfo,
  FileType,
  deleteFileSuccess,
  selectFilesByFileType,
  setFiles,
} from "../portalSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Axios from "api/axios";
import FileSaver from "file-saver";
import { RootState } from "store";
import Upload from "components/portal/Upload";
import { useTranslation } from "react-i18next";

interface UploadMultipleProps {
  label?: string;
  accept?: string;
  fileType: FileType;
  disabled?: boolean;
}

interface UploadedFileInfo extends Partial<FileInfo> {
  uploading?: boolean;
  error?: string;
}

const handleDownload = (id: string) =>
  Axios.get(`application/@me/file/${id}`, {
    responseType: "blob",
  }).then((res) => {
    const utf8FileName = res.headers["content-disposition"].split(
      "filename*=UTF-8''"
    )[1];
    const decodedName = decodeURIComponent(utf8FileName);
    const normalName = res.headers["content-disposition"].split("filename=")[1];
    FileSaver.saveAs(
      res.data,
      utf8FileName === undefined
        ? normalName.substring(1, normalName.length - 1)
        : decodedName.substring(1, decodedName.length - 1)
    );
  });

const UploadMultiple: React.FC<UploadMultipleProps> = ({
  label,
  accept,
  fileType,
  disabled,
}) => {
  // const [uploadingFiles, setUploadingFiles] = useState<UploadedFileInfo[]>();
  const [uploadingFile, setUploadingFile] = useState<UploadedFileInfo>();
  const dispatch = useDispatch();
  const uploadedFiles = useSelector((state: RootState) =>
    selectFilesByFileType(state, fileType)
  );
  const { t } = useTranslation();

  function handleChange(file: File, fileName: string) {
    const error = file.size > 5 * 10 ** 6 ? t("too large") : undefined;
    setUploadingFile({
      name: file.name,
      uploading: true && !error,
      error,
    });
    if (error) return;
    const form = new FormData();
    form.append("file", file, fileName);
    Axios.post<FileInfo>(`application/@me/file/${fileType}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setUploadingFile(undefined);
        dispatch(setFiles([res.data]));
      })
      .catch(() => {
        setUploadingFile(undefined);
        const error = t("Couldn't upload");
        setUploadingFile({
          name: file.name,
          uploading: true && !error,
          error,
        });
      });
  }

  // function handleChange(files: FileList, fileName: string[]) {
  //   const newUploadingFiles: UploadedFileInfo[] = [];
  //   const form = new FormData();
  //   let uploading = false;
  //   for (let i = 0; i < files.length; i++) {
  //     const error = files[i].size > 5 * 10 ** 6 ? t("too large") : undefined;
  //     newUploadingFiles.push({
  //       name: files[i].name,
  //       uploading: true && !error,
  //       error,
  //     });
  //     if (!error) {
  //       form.append("file", files[i], files[i].name);
  //       uploading = true;
  //     }
  //   }
  //   setUploadingFiles(newUploadingFiles);
  //   if (uploading)
  //     Axios.post<FileInfo[]>(`application/@me/file/${fileType}`, form, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     }).then((res) => {
  //       const errorFilesOnly = newUploadingFiles.filter((file) => file.error);
  //       setUploadingFiles(errorFilesOnly);
  //     });
  // }

  const handleDelete = (id: string) =>
    Axios.delete(`/application/@me/file/${id}`).then(() => {
      dispatch(deleteFileSuccess(id));
    });

  const handleCancel = () => setUploadingFile(undefined);

  return (
    <>
      {/* {uploadingFiles?.map((file: any) => (
        <Upload
          uploaded={file.name}
          disabled
          key={file.name}
          uploading={file.uploading}
          error={file.error}
        />
      ))} */}
      {uploadedFiles?.map((file: FileInfo) => (
        <Upload
          key={file.id}
          disabled
          uploaded={file.name}
          onDownload={() => handleDownload(file.id)}
          onDelete={() => handleDelete(file.id)}
        />
      ))}
      {uploadingFile && (
        <Upload
          uploaded={uploadingFile.name}
          disabled
          key={uploadingFile.name}
          uploading={uploadingFile.uploading}
          error={uploadingFile.error}
          onCancel={handleCancel}
        />
      )}
      {(uploadedFiles?.length || 0) + (uploadingFile ? 1 : 0) < 5 && (
        <Upload
          accept={accept}
          uploadLabel={t("Choose file")}
          label={label}
          onChange={handleChange}
          disabled={disabled}
        />
      )}
    </>
  );
};

export default UploadMultiple;
