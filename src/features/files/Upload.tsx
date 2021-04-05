import React, { useState } from "react";

import { FileType } from "types/files";
import Upload from "components/portal/Upload";
import { downloadFile } from "api/files";
import hasApplicationClosed from "utils/hasApplicationClosed";
import { toast } from "react-toastify";
import { useFiles } from "./filesHooks";
import { useTranslation } from "react-i18next";

interface UploadHookProps {
  accept?: string;
  fileType: FileType;
  disabled?: boolean;
  applicantID?: string;
  multiple?: number;
  maxFileSize?: number;
  alwaysAbleToUpload?: boolean;
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
  maxFileSize = 5 * 10 ** 6,
  multiple = 1,
  alwaysAbleToUpload,
  applicantID,
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFileInfo[]>([]);
  const { removeFile, data: files, addFile } = useFiles(applicantID, fileType);
  const { t } = useTranslation();

  const handleDelete = (fileID: string, applicantID: string) =>
    removeFile(fileID, applicantID).catch((err) => {
      toast.error(err.message);
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
      addFile(fileType, file, fileName)
        .then(() => {
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

  const closed = hasApplicationClosed();
  const disabledUploading = (closed && !alwaysAbleToUpload) || disabled;
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
          onDownload={() => downloadFile(file.id, file.userId)}
          onDelete={() => handleDelete(file.id, file.userId)}
          onChange={handleUpload}
        />
      ))}
      {uploadingFiles.map((file) => (
        <Upload
          uploaded={file.name}
          key={"uploading-" + file.name}
          uploading={file.uploading}
          disabled
          error={file.error}
          onCancel={handleCancel}
        />
      ))}
      {(files?.length || 0) + uploadingFiles.length < multiple && (
        <>
          <Upload
            label={label}
            accept={accept}
            onChange={handleUpload}
            disabled={disabledUploading}
          />
        </>
      )}
    </>
  );
};

export default UploadHook;
