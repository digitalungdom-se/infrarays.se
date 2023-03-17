import React, { useState } from "react";

import Upload from "components/Upload";
import hasApplicationClosed from "utils/hasApplicationClosed";
import { toast } from "react-toastify";
// import { useFiles } from "./filesHooks";
import { useTranslation } from "react-i18next";
import {
  useDeleteFileMutation,
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

  const {
    data: allFilesByApplicant,
    isLoading: filesLoading,
    error: errorFiles,
  } = useGetFilesQuery(applicantID);

  const files = allFilesByApplicant?.filter((file) => file.type === type);

  const [downloadFile, { isLoading: isDownloading }] =
    useLazyDownloadFileQuery();
  const [deleteFile, { isLoading: deleteFileLoading }] =
    useDeleteFileMutation();
  const [
    uploadFile,
    { isLoading: uploadLoading, data: uploadedFile, originalArgs },
  ] = useUploadFileMutation();

  const [error, setError] = useState<UploadingFileInfo | null>(null);

  const handleDelete = (fileID: string) =>
    deleteFile({
      fileID,
      applicantID,
    })
      .then(() => {
        return;
      })
      .catch((err: any) => {
        toast.error(err.message);
      });

  const handleUpload = (file: File) => {
    if (file.size > maxFileSize) {
      setError({
        name: file.name,
        error: "too large",
        uploading: false,
      });
    } else {
      uploadFile({
        file,
        applicantID,
        fileType: type,
      });
      // .then(() => {
      //   setError();
      // })
      // .catch((err) => {
      //   setError({
      //     name: file.name,
      //     error: err.message,
      //     uploading: false,
      //   });
      // });
    }
  };

  const handleCancel = () => setError(null);

  const closed = hasApplicationClosed();
  const disabledUploading =
    (closed && !alwaysAbleToUpload) ||
    filesLoading ||
    uploadLoading ||
    errorFiles !== undefined;
  const label = t(`chapters.${type}.upload.label`);

  console.log(
    error?.name || originalArgs?.file.name || uploadedFile?.name,
    error?.error
  );

  return (
    <>
      {files?.map((file) => (
        <Upload
          uploaded={originalArgs?.file.name || file.name || uploadedFile?.name}
          key={file.id}
          label={label}
          accept={accept}
          disabled={multiple > 1 || disabledUploading}
          uploadLabel={t("Choose file")}
          uploading={(uploadLoading || filesLoading) && multiple == 1}
          downloading={isDownloading}
          onDownload={() =>
            downloadFile({
              fileID: file.id,
              applicantID,
            }).then(() => {
              return;
            })
          }
          deleting={deleteFileLoading}
          onDelete={() => handleDelete(file.id)}
          onChange={handleUpload}
        />
      ))}
      {(files?.length || 0) < multiple && (
        <>
          <Upload
            label={label}
            accept={accept}
            onChange={handleUpload}
            disabled={disabledUploading}
            uploadLabel={t("Choose file")}
            uploading={uploadLoading}
            error={error?.error}
            uploaded={error?.name}
            onCancel={handleCancel}
          />
        </>
      )}
    </>
  );
};

export default UploadHook;
