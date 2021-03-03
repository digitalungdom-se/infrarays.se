import { CopyToClipboard } from "react-copy-to-clipboard";
import React from "react";
interface CopyLoginCodeProps {
  code: string;
}

const CopyLoginCode = ({ code }: CopyLoginCodeProps): React.ReactElement => {
  return (
    <CopyToClipboard text={code}>
      <span style={{ color: "black" }}>
        Klicka på koden för att kopiera!
        <br />
        <code>{code}</code>
      </span>
    </CopyToClipboard>
  );
};
export default CopyLoginCode;
