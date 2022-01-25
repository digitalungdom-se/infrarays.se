import React, { useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";

interface CopyLoginCodeProps {
  /**
   * Code that should be copied
   */
  code: string;
  /**
   * When the user clicks on the code and it has been copied
   */
  onCopy?: () => void;
}

const CopyLoginCode = ({
  code,
  onCopy,
}: CopyLoginCodeProps): React.ReactElement => {
  const [copied, setCopied] = useState<boolean>(false);
  // translate the messages
  const { t } = useTranslation();
  return (
    <CopyToClipboard
      text={code}
      onCopy={() => {
        // set copied to true to change the text and hide the code
        setCopied(true);
        if (onCopy) onCopy();
      }}
    >
      <span>
        {copied ? (
          t("Copied")
        ) : (
          <>
            {t("Click to copy")}
            <br />
            <code>{code}</code>
          </>
        )}
      </span>
    </CopyToClipboard>
  );
};
export default CopyLoginCode;
