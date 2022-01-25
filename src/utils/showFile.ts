/**
 * Open a blob in a new tab
 * @param blob
 * @param name
 * @returns void
 */
function showFile(blob: Blob, name: string): Promise<void> {
  return new Promise((res, rej) => {
    try {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      const newBlob = new Blob([blob], { type: "application/pdf" });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob, name);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);
      window.open(data);
      res();
      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        // document.removeChild(link);
        window.URL.revokeObjectURL(data);
      }, 100);
    } catch {
      rej();
    }
  });
}

export default showFile;
