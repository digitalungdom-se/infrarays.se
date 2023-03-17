// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { ServerTokenResponse } from "types/tokens";

import { RootState } from "store";
import baseQuery from "fetchBaseQuery";
import { FileInfo, FileType } from "types/files";
import FileSaver from "file-saver";

export const fileApi = createApi({
  reducerPath: "fileApi",
  baseQuery,
  tagTypes: ["File"],
  endpoints: (builder) => ({
    getFiles: builder.query<FileInfo[], string | undefined>({
      query: (applicantID = "@me") => ({
        url: `/application/${applicantID}/file`,
      }),
      providesTags: (result, error, applicantID) => [
        { type: "File", id: applicantID },
      ],
    }),
    deleteFile: builder.mutation<
      void,
      { fileID: string; applicantID?: string }
    >({
      query: ({ fileID, applicantID = "@me" }) => ({
        url: `/application/${applicantID}/file/${fileID}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { fileID, applicantID = "@me" }) => [
        { type: "File", applicantId: applicantID },
      ],
    }),
    uploadFile: builder.mutation<
      FileInfo,
      { file: File; applicantID?: string; fileType: FileType }
    >({
      query: ({ file, applicantID = "@me", fileType }) => {
        const form = new FormData();
        form.append("file", file, file.name);
        return {
          url: `/application/${applicantID}/file/${fileType}`,
          method: "POST",
          body: form,
        };
      },
      invalidatesTags: (result, error, { applicantID }) => [
        { type: "File", applicantID },
      ],
    }),
    downloadFile: builder.query<void, { fileID: string; applicantID?: string }>(
      // .get(`application/${applicantID}/file/${fileID}`, {
      //   responseType: "blob",
      // })
      // .then((res) => {
      //   const utf8FileName =
      //     res.headers["content-disposition"].split("filename*=UTF-8''")[1];
      //   const decodedName = decodeURIComponent(utf8FileName);
      //   const normalName =
      //     res.headers["content-disposition"].split("filename=")[1];
      //   FileSaver.saveAs(
      //     res.data,
      //     utf8FileName === undefined
      //       ? normalName.substring(1, normalName.length - 1)
      //       : decodedName.substring(1, decodedName.length - 1)
      //   );
      // });
      {
        query: ({ fileID, applicantID = "@me" }) => ({
          url: `/application/${applicantID}/file/${fileID}`,
          responseType: "blob",
          responseHandler: (response) => {
            return response.blob().then((blob) => {
              const utf8FileName = response.headers
                .get("content-disposition")
                ?.split("filename*=UTF-8''")[1];
              const decodedName = decodeURIComponent(utf8FileName ?? "");
              const normalName = response.headers
                .get("content-disposition")
                ?.split("filename=")[1];
              const name =
                utf8FileName === undefined ? normalName : decodedName;
              FileSaver.saveAs(
                blob,
                name?.substring(1, name.length - 1) ?? "file"
              );
            });
          },
        }),
      }
    ),
    getApplicationPDF: builder.query<[Blob, string], string | void>({
      query: (applicantID = "@me") => ({
        url: `/application/${applicantID}/pdf`,
        responseType: "blob",
        responseHandler: (response) => {
          return response.blob().then((blob) => {
            const utf8FileName = response.headers
              .get("content-disposition")
              ?.split("filename*=UTF-8''")[1];
            const decodedName = decodeURIComponent(utf8FileName ?? "");
            const normalName = response.headers
              .get("content-disposition")
              ?.split("filename=")[1];
            const name = utf8FileName === undefined ? normalName : decodedName;
            return [blob, name];
          });
        },
      }),
    }),
  }),
});

export const {
  useGetFilesQuery,
  useLazyDownloadFileQuery,
  useDeleteFileMutation,
  useUploadFileMutation,
  useLazyGetApplicationPDFQuery,
} = fileApi;
