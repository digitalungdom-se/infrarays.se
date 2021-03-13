import React, { useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";

interface CopyLoginCodeProps {
  code: string;
  onCopy?: () => void;
}

const CopyLoginCode = ({
  code,
  onCopy,
}: CopyLoginCodeProps): React.ReactElement => {
  const [copied, setCopied] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <CopyToClipboard
      text={code}
      onCopy={() => {
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
