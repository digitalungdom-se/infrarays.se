import React, { useState } from "react";
import { deleteFile, downloadFile, uploadFile } from "api/files";
import {
  deleteFileSuccess,
  replaceFile,
  selectFilesByFileTypeAndApplicant,
  setFiles,
} from "./filesSlice";
import { useDispatch, useSelector } from "react-redux";

import { FileType } from "types/files";
import Upload from "components/portal/Upload";
import moment from "moment";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { selectIsFinnish } from "features/application/applicationSlice";

interface UploadHookProps {
  accept?: string;
  fileType: FileType;
  disabled?: boolean;
  applicantID?: string;
  multiple?: number;
  maxFileSize?: number;
  alwaysAbleToUpload?: boolean;
  me?: boolean;
}

interface UploadingFileInfo {
  uploading: boolean;
  error?: string;
  name: string;
}

const UploadHook: React.FC<UploadHookProps> = ({
  disabled,
  accept,
  fileType,
  applicantID,
  maxFileSize = 5 * 10 ** 6,
  multiple = 1,
  alwaysAbleToUpload,
  me = false,
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFileInfo[]>([]);
  const dispatch = useDispatch();
  const files = useSelector(
    selectFilesByFileTypeAndApplicant(fileType, applicantID)
  );
  const isFinnish = useSelector(selectIsFinnish);
  const { t } = useTranslation();

  const handleDelete = (fileID: string, applicantID: string) =>
    new Promise<Promise<void> | undefined>(() => {
      const result = window.confirm(
        "Är du säker på att du vill ta bort filen? Det går inte att ångra."
      );
      if (result) {
        return deleteFile(fileID, me ? "@me" : applicantID)
          .then(() => {
            dispatch(deleteFileSuccess([applicantID, fileType, fileID]));
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
      return new Promise<void>((res) => {
        res();
      });
    });

  const handleUpload = (file: File, fileName: string) => {
    if (file.size > maxFileSize) {
      setUploadingFiles([
        {
          name: file.name,
          error: "too large",
          uploading: false,
        },
      ]);
    } else {
      setUploadingFiles([{ name: file.name, uploading: true }]);
      uploadFile(fileType, file, fileName, me ? "@me" : applicantID)
        .then((res) => {
          if (multiple > 1) dispatch(setFiles([res]));
          else dispatch(replaceFile(res));
          setUploadingFiles([]);
        })
        .catch((err) => {
          setUploadingFiles([
            { name: file.name, uploading: false, error: err.message },
          ]);
        });
    }
  };

  const handleCancel = () => setUploadingFiles([]);

  const applicationHasClosed = isFinnish
    ? moment("04-01", "MM-DD").utc().diff(Date.now()) < 0
    : moment.utc().month(2).endOf("month").diff(Date.now()) < 0;
  const disabledUploading =
    (applicationHasClosed && !alwaysAbleToUpload) || disabled;
  const label = t(`${fileType}.upload.label`);

  return (
    <>
      {files?.map((file) => (
        <Upload
          uploaded={file.name}
          key={file.id}
          label={label}
          accept={accept}
          disabled={multiple > 1 || disabledUploading}
          uploadLabel={t("Choose file")}
          onDownload={() => downloadFile(file.id, me ? "@me" : file.userId)}
          onDelete={
            disabledUploading && !alwaysAbleToUpload
              ? undefined
              : () => handleDelete(file.id, file.userId)
          }
          onChange={handleUpload}
        />
      ))}
      {uploadingFiles.map((file) => (
        <Upload
          uploaded={file.name}
          key={"uploading-" + file.name}
          uploading={file.uploading}
          error={file.error}
          onCancel={handleCancel}
          uploadLabel={t("Choose file")}
        />
      ))}
      {(files?.length || 0) + uploadingFiles.length < multiple && (
        <>
          <Upload
            label={label}
            accept={accept}
            onChange={handleUpload}
            disabled={disabledUploading}
            uploadLabel={t("Choose file")}
          />
        </>
      )}
    </>
  );
};

export default UploadHook;
