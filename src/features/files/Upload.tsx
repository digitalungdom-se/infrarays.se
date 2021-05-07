import React, { useState } from "react";

import { FileType } from "types/files";
import Upload from "components/Upload";
import hasApplicationClosed from "utils/hasApplicationClosed";
import { toast } from "react-toastify";
import { useFiles } from "./filesHooks";
import { useTranslation } from "react-i18next";

interface UploadHookProps {
  accept?: string;
  fileType: FileType;
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
  accept,
  fileType,
  maxFileSize = 5 * 10 ** 6,
  multiple = 1,
  alwaysAbleToUpload,
  applicantID,
}) => {
  const { t } = useTranslation();
  const { removeFile, data: files, addFile, loading, downloadFile } = useFiles(
    applicantID,
    fileType
  );
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFileInfo[]>([]);

  const handleDelete = (fileID: string) =>
    removeFile(fileID).catch((err) => {
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
  const disabledUploading = (closed && !alwaysAbleToUpload) || loading;
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
          onDownload={() => downloadFile(file.id)}
          onDelete={() => handleDelete(file.id)}
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
