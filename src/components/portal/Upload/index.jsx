import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

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
`;

export default ({
  label,
  onChange = () => {},
  uploaded,
  uploading,
  displayFileName,
  accept,
}) => {
  const [fileName, updateFileName] = useState('');

  function handleFileChange(e) {
    const list = e.target.value.split('\\');
    const name = list[list.length - 1];
    updateFileName(name);
    return onChange(e.target.files[0], name);
  }

  return (
    <StyledInputGroup className={`mb-3 custom-file ${uploaded && !uploading && 'uploaded'}`}>
      <FormControl
        type="file"
        className="custom-file-input file-input"
        onChange={handleFileChange}
        accept={accept}
      />
      <InputGroup.Text className="custom-file-label">
        {(!uploading && !uploaded) && (displayFileName ? (fileName || label) : label)}
        {uploading && (
          <span>
            <Spinner animation="border" variant="primary" size="sm" />
            {' '}
            Laddar upp
            {' '}
            {fileName}
            {' '}
          </span>
        )}
        {
          (!uploading && uploaded)
          && (
          <span>
            <FontAwesomeIcon icon={faCheck} color="green" />
            {` ${uploaded} `}
          </span>
          )
        }
      </InputGroup.Text>
    </StyledInputGroup>
  );
};
