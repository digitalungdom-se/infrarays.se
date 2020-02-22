import React, { useState } from 'react';
import Upload from 'components/portal/Upload';
import { useSelector, useDispatch } from 'react-redux';
import { uploadSuccess } from 'features/appSlice';
import { useTranslation } from 'react-i18next';

const UploadHook = ({ label, accept, fileType }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const uploaded = useSelector(state => state.app.files[fileType]);
  const { t } = useTranslation();

  function handleChange(file, fileName) {
    if (file.size > 7 * Math.pow(10, 6)) {
      setError({ msg: t('too large'), fileName });
      return;
    }
    setUploading(true);
    const form = new FormData();
    form.append('file', file, fileName);
    fetch(`/api/user/upload/pdf/${fileType}`, {
      method: 'post',
      body: form
    })
      .then(res => res.json())
      .then(res => {
        setUploading(false);
        if (res.type === 'success') {
          dispatch(uploadSuccess({ fileName, fileType }));
        } else {
          res.json = true;
          throw res;
        }
      })
      .catch(err => {
        if (err.json) {
          setError({ msg: err?.errors[0].msg, fileName });
        }
      });
  }

  return (
    <Upload
      label={label}
      accept={accept}
      onChange={handleChange}
      uploading={uploading}
      uploaded={uploaded?.name || error?.fileName}
      time={uploaded?.time}
      error={error?.msg}
    />
  );
};

export default UploadHook;
