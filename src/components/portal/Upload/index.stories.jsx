import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Upload from './index';

export default {
  title: 'Upload',
  decorators: [(Story) => (
    <div style={{ padding: 50 }}>
      <Story />
    </div>
  )],
};

export const UploadHook = () => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState('');

  function handleChange(file, fileName) {
    action('file-change')(file, fileName);
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(fileName);
    }, 1000);
  }

  return (
    <Upload
      title="Ladda upp personligt brev"
      onChange={handleChange}
      uploading={uploading}
      uploaded={uploaded}
    />
  );
};


UploadHook.story = {
  name: 'Upload with Hooks',
};
