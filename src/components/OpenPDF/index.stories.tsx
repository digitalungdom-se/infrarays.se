import OpenPDF from "./index";
import React from "react";

export default { title: "OpenPDF" };

export const Button = (): React.ReactElement => (
  <OpenPDF
    onDownload={() => new Promise((res) => setInterval(() => res(), 1000))}
  >
    Open
  </OpenPDF>
);
