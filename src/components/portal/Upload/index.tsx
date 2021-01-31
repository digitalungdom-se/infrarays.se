import React, { useState } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const StyledInputGroup = styled(InputGroup)`
  &.uploaded span {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }

  &.uploaded span::after {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }

  &.error span {
    color: #bd2130;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }

  &.error span::after {
    color: #fff;
    background-color: #c82333;
    border-color: #bd2130;
  }
`;

export interface UploadProps {
  label?: string;
  onChange?: (file: any, name: string) => any;
  uploaded?: string;
  uploading?: boolean;
  displayFileName?: boolean;
  accept?: string;
  error?: string;
}

const Upload: React.FC<UploadProps> = ({
  label,
  onChange = () => true,
  uploaded,
  uploading,
  displayFileName,
  accept,
  error,
}) => {
  const [fileName, updateFileName] = useState("");

  function handleFileChange(e: any) {
    const list = e.target.value.split("\\");
    const name = list[list.length - 1];
    updateFileName(name);
    return onChange(e.target.files[0], name);
  }

  return (
    <StyledInputGroup
      className={`mb-3 custom-file ${uploaded && !uploading && "uploaded"} ${
        error && "error"
      }`}
    >
      <FormControl
        type="file"
        className="custom-file-input file-input"
        onChange={handleFileChange}
        accept={accept}
        isInvalid={Boolean(error)}
      />
      <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
      <InputGroup.Text className="custom-file-label">
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
          <span style={{ wordWrap: "break-word", display: "block" }}>
            {error ? (
              <FontAwesomeIcon icon={faTimes} color="#721c24" />
            ) : (
              <FontAwesomeIcon icon={faCheck} color="green" />
            )}
            {` ${uploaded}`}
          </span>
        )}
      </InputGroup.Text>
    </StyledInputGroup>
  );
};

export default Upload;
