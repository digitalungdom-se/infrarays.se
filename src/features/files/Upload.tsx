import React, { useState } from "react";

import Upload from "components/Upload";
import hasApplicationClosed from "utils/hasApplicationClosed";
import { toast } from "react-toastify";
// import { useFiles } from "./filesHooks";
import { useTranslation } from "react-i18next";
import {
  useDeleteFileMutation,
  useGetFilesByType,
  useGetFilesQuery,
  useLazyDownloadFileQuery,
  useUploadFileMutation,
} from "services/file";
import { FileType } from "types/files";

interface UploadHookProps {
  accept?: string;
  type: FileType;
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
  type,
  maxFileSize = 5 * 10 ** 6,
  multiple = 1,
  alwaysAbleToUpload,
  applicantID,
}) => {
  const { t } = useTranslation();
  const { files, isLoading: filesLoading } = useGetFilesByType(
    type,
    applicantID
  );
  const [downloadFile] = useLazyDownloadFileQuery();
  const [deleteFile, { isLoading: deleteFileLoading }] =
    useDeleteFileMutation();
  const [uploadFile, { isLoading: uploadLoading }] = useUploadFileMutation();

  const [uploadingFiles, setUploadingFiles] = useState<UploadingFileInfo[]>([]);

  const handleDelete = (fileID: string) =>
    deleteFile({
      fileID,
      applicantID,
    })
      .then(() => {})
      .catch((err: any) => {
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
      uploadFile({
        file,
        applicantID,
        fileType: type,
      })
        .then(() => {
          setUploadingFiles([]);
        })
        .catch((err) => {
          setUploadingFiles([
            {
              name: file.name,
              error: err.message,
              uploading: false,
            },
          ]);
        });
    }
  };

  const handleCancel = () => setUploadingFiles([]);

  const closed = hasApplicationClosed();
  const disabledUploading =
    (closed && !alwaysAbleToUpload) || filesLoading || uploadLoading;
  const label = t(`chapters.${type}.upload.label`);

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
          uploading={uploadLoading}
          onDownload={() =>
            downloadFile({
              fileID: file.id,
              applicantID,
            }).then(() => {})
          }
          deleting={deleteFileLoading}
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
            disabled={disabledUploading || uploadingFiles.length > 0}
            uploadLabel={t("Choose file")}
            uploading={uploadLoading}
          />
        </>
      )}
    </>
  );
};

export default UploadHook;
