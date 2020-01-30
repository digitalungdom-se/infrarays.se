import React, { useState } from 'react';
import Upload from 'components/portal/Upload';
import { useSelector, useDispatch } from 'react-redux';
import { uploadSuccess } from 'features/appSlice';

const UploadHook = ({ label, accept, fileType }) => {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const uploaded = useSelector(state => state.app.files[fileType]);

  function handleChange(file, fileName) {
    setUploading(true);
    const form = new FormData();
    form.append('file', file, fileName);
    fetch(`/api/user/upload/pdf/${fileType}`, {
      method: 'post',
      body: form
    })
      .then(res => res.json())
      .then(() => {
        setUploading(false);
        dispatch(uploadSuccess({ fileName, fileType }));
      });
  }

  return (
    <Upload
      label={label}
      accept={accept}
      onChange={handleChange}
      uploading={uploading}
      uploaded={uploaded?.name}
      time={uploaded?.time}
    />
  );
};

export default UploadHook;
