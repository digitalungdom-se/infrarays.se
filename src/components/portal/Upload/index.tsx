import React, { useState } from "react";
import { faCheck, faCog, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import StyledInputGroup from "components/StyledInputGroup";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface TranslatedFormControlProps {
  label?: string;
}

const TranslatedFormControl = styled(FormControl)<TranslatedFormControlProps>`
  ${(props) =>
    props
      ? `& ~ .custom-file-label::after {content: "${
          props.label || "Choose file"
        }";`
      : `&:lang(sv) ~ .custom-file-label::after {
    content: "Välj fil";
  }`}
`;

export interface UploadProps {
  /**
   * Label for the field, i.e. "Upload CV" or "Upload letter of recommendation"
   */
  label?: string;
  /**
   * Function that returns a promise for downloading file
   */
  onDownload?: () => Promise<void>;
  /**
   * Function that returns a promise for deleting a file
   */
  onDelete?: () => Promise<void>;
  /**
   * Function that returns a cancelling an upload request
   */
  onCancel?: () => void;
  /**
   * The uploaded file name
   */
  uploaded?: string;
  /**
   * Whether the field is uploading or not
   */
  uploading?: boolean;
  /**
   * Which files should be accepted
   */
  accept?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Label for "Choose file"
   */
  uploadLabel?: string;
  /**
   * Is the field disabled, i.e. should not allow things to be changed
   */
  disabled?: boolean;
  /**
   * Function that is called when a file is chosen
   */
  onChange?: (file: File, name: string) => void;
}

const Upload: React.FC<UploadProps> = ({
  label,
  onChange = () => null,
  onDownload,
  onDelete,
  onCancel,
  uploaded,
  uploading,
  accept,
  error,
  uploadLabel,
  disabled,
}) => {
  const [fileName, updateFileName] = useState("");
  const [downloading, setDownloading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const onToggle = (
    isOpen: boolean,
    event: React.SyntheticEvent<Dropdown, Event>,
    metadata: { source: "select" | "click" | "rootClose" | "keydown" }
  ) => {
    if (metadata.source === "select") {
      setOpen(true);
      return;
    }
    setOpen(isOpen);
  };

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.value.split("\\");
    updateFileName(list[list.length - 1]);
    if (e.target.files)
      return onChange(e.target.files[0], list[list.length - 1]);
  }

  const { t } = useTranslation();
  const showDropdown =
    (error && Boolean(onCancel)) ||
    (uploaded && (Boolean(onDownload) || Boolean(onDelete)));

  const newLabel = (
    <>
      {!uploading && !uploaded && label}
      {uploading && (
        <span>
          <Spinner animation="border" variant="primary" size="sm" /> Laddar upp{" "}
          {fileName || uploaded}
        </span>
      )}
      {!uploading && uploaded && (
        <span
          style={{
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {error ? (
            <FontAwesomeIcon icon={faTimes} color="#721c24" />
          ) : (
            <FontAwesomeIcon icon={faCheck} color="green" />
          )}
          {` ${uploaded}`}
        </span>
      )}
    </>
  );

  return (
    <>
      <StyledInputGroup
        className={`mb-3 ${uploaded && !uploading && "uploaded"} ${
          error && "error"
        }`}
      >
        {disabled && uploaded ? (
          <div className="form-control">{newLabel}</div>
        ) : (
          <div className="custom-file">
            <TranslatedFormControl
              disabled={disabled}
              type="file"
              className="custom-file-input file-input"
              onChange={handleFileChange}
              accept={accept}
              isInvalid={Boolean(error)}
              label={uploadLabel}
            />
            <span className="custom-file-label">{newLabel}</span>
          </div>
        )}
        {showDropdown && (
          <InputGroup.Append>
            <Dropdown show={open} onToggle={onToggle}>
              <Dropdown.Toggle
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                <FontAwesomeIcon icon={faCog} />
              </Dropdown.Toggle>
              <Dropdown.Menu align="right">
                {!error && onDownload && (
                  <Dropdown.Item
                    as="button"
                    disabled={downloading}
                    onClick={() => {
                      setDownloading(true);
                      if (onDownload)
                        onDownload()?.then(() => {
                          setDownloading(false);
                        });
                    }}
                  >
                    {downloading ? (
                      <>
                        <Spinner
                          animation="border"
                          variant="primary"
                          size="sm"
                        />{" "}
                        {t("Downloading file")}
                      </>
                    ) : (
                      t("Download file")
                    )}
                  </Dropdown.Item>
                )}
                {error && onCancel && (
                  <Dropdown.Item as="button" onClick={onCancel}>
                    {t("Cancel")}
                  </Dropdown.Item>
                )}
                {!error && onDelete && (
                  <Dropdown.Item
                    as="button"
                    disabled={deleting}
                    onClick={() => {
                      setDeleting(true);
                      if (onDelete)
                        onDelete()?.then(() => {
                          setDeleting(false);
                        });
                    }}
                  >
                    {deleting ? (
                      <>
                        <Spinner
                          animation="border"
                          variant="primary"
                          size="sm"
                        />{" "}
                        {t("Deleting file")}
                      </>
                    ) : (
                      t("Delete file")
                    )}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup.Append>
        )}
      </StyledInputGroup>
      <FormControl.Feedback
        style={{
          display: error ? "block" : "none",
          marginTop: "-1rem",
          marginBottom: "1rem",
        }}
        type="invalid"
      >
        {error}
      </FormControl.Feedback>
    </>
  );
};

export default Upload;
