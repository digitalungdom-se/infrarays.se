import React, { useState } from 'react';
import Upload from 'components/portal/Upload';

const UploadHook = ({ label, accept }) => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState('');

  function handleChange(file, fileName) {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(fileName);
    }, 1000);
  }

  return (
    <Upload
      label={label}
      accept={accept}
      onChange={handleChange}
      uploading={uploading}
      uploaded={uploaded}
    />
  );
};

export default UploadHook;
