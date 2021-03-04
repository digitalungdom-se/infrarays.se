import React, { useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";

interface CopyLoginCodeProps {
  code: string;
}

const CopyLoginCode = ({ code }: CopyLoginCodeProps): React.ReactElement => {
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
      <span style={{ color: "black" }}>
        {copied ? (
          "Kopierad!"
        ) : (
          <>
            Klicka på koden för att kopiera!
            <br />
            <code>{code}</code>
          </>
        )}
      </span>
    </CopyToClipboard>
  );
};
export default CopyLoginCode;
