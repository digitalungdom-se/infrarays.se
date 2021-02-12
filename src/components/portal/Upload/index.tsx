import React, { useState } from "react";
import { faCheck, faCog, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledInputGroup = styled(InputGroup)`
  &.uploaded span {
    color: #155724;
    background-color: #d4edda;
  }

  &.uploaded span::after,
  &.uploaded .input-group-append .dropdown-toggle {
    color: #fff;
    background-color: #42c15f;
    border-color: #28a745;
  }

  &.uploaded .input-group-append .dropdown-toggle {
    background-color: rgba(40, 167, 69, 1);
  }

  &.uploaded span {
    border-color: #c3e6cb;
  }

  &.error span {
    color: #bd2130;
    background-color: #f8d7da;
  }

  &.error span::after,
  &.error .input-group-append .dropdown-toggle {
    color: #fff;
    background-color: #e23d4d;
    border-color: #bd2130;
  }

  &.error .input-group-append .dropdown-toggle {
    background-color: rgba(200, 35, 51, 1);
  }
`;

interface StyledFormControlProps {
  label?: string;
}

const StyledFormControl = styled(FormControl)<StyledFormControlProps>`
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
  label?: string;
  onChange?: (file: any, name: string) => any;
  onDownload?: () => Promise<void>;
  onDelete?: () => Promise<void>;
  uploaded?: string;
  uploading?: boolean;
  displayFileName?: boolean;
  accept?: string;
  error?: string;
  uploadLabel?: string;
}

const Upload: React.FC<UploadProps> = ({
  label,
  onChange = () => null,
  onDownload = () => null,
  onDelete = () => null,
  uploaded,
  uploading,
  displayFileName,
  accept,
  error,
  uploadLabel,
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

  function handleFileChange(e: any) {
    const list = e.target.value.split("\\");
    const name = list[list.length - 1];
    updateFileName(name);
    return onChange(e.target.files[0], name);
  }

  const { t } = useTranslation();

  return (
    <StyledInputGroup
      className={`mb-3 ${uploaded && !uploading && "uploaded"} ${
        error && "error"
      }`}
    >
      <div className="custom-file">
        <StyledFormControl
          type="file"
          className="custom-file-input file-input"
          onChange={handleFileChange}
          accept={accept}
          isInvalid={Boolean(error)}
          label={uploadLabel}
        />
        <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
        <span className="custom-file-label">
          {!uploading &&
            !uploaded &&
            (displayFileName ? fileName || label : label)}
          {uploading && (
            <span>
              <Spinner animation="border" variant="primary" size="sm" />
              Laddar upp
              {fileName}
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
        </span>
      </div>
      {uploaded && (
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
              <Dropdown.Item
                as="button"
                disabled={downloading}
                onClick={() => {
                  setDownloading(true);
                  onDownload()?.then(() => {
                    setDownloading(false);
                  });
                }}
              >
                {downloading ? (
                  <>
                    <Spinner animation="border" variant="primary" size="sm" />{" "}
                    {t("Downloading")}
                  </>
                ) : (
                  t("Download")
                )}
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                disabled={deleting}
                onClick={() => {
                  setDeleting(true);
                  onDelete()?.then(() => {
                    setDeleting(false);
                  });
                }}
              >
                {deleting ? (
                  <>
                    <Spinner animation="border" variant="primary" size="sm" />{" "}
                    {t("Deleting")}
                  </>
                ) : (
                  t("Delete")
                )}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup.Append>
      )}
    </StyledInputGroup>
  );
};

export default Upload;
