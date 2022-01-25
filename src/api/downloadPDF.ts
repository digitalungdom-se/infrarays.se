import api from "./axios";
import showFile from "utils/showFile";

/**
 * Downloads PDF and returns the blob and the file name
 * @param applicantID
 * @returns {[Blob, string]} Blob and file name
 */
export const downloadPDF = (applicantID: string): Promise<[Blob, string]> =>
  api
    .get<Blob>(`/application/${applicantID}/pdf`, { responseType: "blob" })
    .then((res) => {
      const name = res.headers["content-disposition"].split("filename=")[1];
      return [res.data, name];
    });

/**
 * Download and open PDF in new tab
 * @param applicantID
 * @returns void
 */
export const downloadAndOpen = (applicantID: string): Promise<void> =>
  downloadPDF(applicantID).then((args) => showFile(...args));

export default downloadPDF;
