import { ButtonProps } from "react-bootstrap/Button";
import LoadingButton from "components/LoadingButton";
import React from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface OpenPDFProps extends ButtonProps {
  /**
   * A function returning a promise that will change the loading state of the button
   */
  onDownload: () => Promise<any>;
}

const OpenPDF: React.FC<OpenPDFProps> = ({
  onDownload,
  children,
  variant = "primary",
}) => {
  const { t } = useTranslation();
  return (
    <LoadingButton
      variant={variant}
      onClick={() =>
        onDownload().catch(() => {
          toast.error(t("Couldnt get file"));
        })
      }
      showOnlyLoading
    >
      {children}
    </LoadingButton>
  );
};

export default OpenPDF;
