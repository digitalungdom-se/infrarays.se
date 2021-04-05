import { FileInfo, FileType } from "types/files";

import FileSaver from "file-saver";
import api from "./axios";

export const getFilesConfiguration = (applicantID = "@me"): string =>
  `/application/${applicantID}/file`;

export const getFiles = (applicantID = "@me"): Promise<FileInfo[]> =>
  api.format.get<FileInfo[]>(getFilesConfiguration(applicantID));

export const downloadFile = (
  fileID: string,
  applicantID = "@me"
): Promise<void> =>
  api
    .get(`application/${applicantID}/file/${fileID}`, {
      responseType: "blob",
    })
    .then((res) => {
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

export const downloadFullPDF = (applicantID = "@me"): Promise<void> =>
  api
    .get(`/application/${applicantID}/pdf`, { responseType: "blob" })
    .then((res) => {
      FileSaver.saveAs(
        res.data,
        res.headers["content-disposition"].split("filename=")[1]
      );
    });

export const deleteFile = (
  fileID: string,
  applicantID = "@me"
): Promise<void> => api.delete(`/application/${applicantID}/file/${fileID}`);

export const uploadFile = (
  fileType: FileType,
  file: File,
  fileName: string,
  applicantID = "@me"
): Promise<FileInfo> => {
  const form = new FormData();
  form.append("file", file, fileName);
  return api
    .post<FileInfo>(`application/${applicantID}/file/${fileType}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};
