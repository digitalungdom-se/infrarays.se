import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';

export default ({ title, onChange }) => {
  const [fileName, updateFileName] = useState('');

  function handleFileChange(e) {
    const list = e.target.value.split('\\');
    const name = list[list.length - 1];
    updateFileName(name);
    return onChange(e.target.files[0], name);
  }

  return (
    <InputGroup className="mb-3 custom-file">
      <FormControl
        type="file"
        className="custom-file-input file-input"
        onChange={handleFileChange}
      />
      <InputGroup.Text className="custom-file-label">
        {fileName ? (
          <span>
            Laddar upp
            {' '}
            {fileName}
            {' '}
            <Spinner animation="border" variant="primary" size="sm" />
          </span>
        ) : title}
      </InputGroup.Text>
    </InputGroup>
  );
};
