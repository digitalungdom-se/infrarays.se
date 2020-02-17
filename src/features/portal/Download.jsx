import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import FileSaver from 'file-saver';
import { useTranslation } from 'react-i18next';

const Download = ({ style }) => {
  const [downloading, setDownload] = useState(false);
  const { t } = useTranslation();
  return (
    <Button
      style={style}
      onClick={() => {
        setDownload(true);
        fetch('/api/user/application', {
          method: 'get'
        })
          .then(res => res.blob())
          .then(blob => {
            setDownload(false);
            FileSaver.saveAs(blob, 'application.pdf');
          });
      }}
      disabled={downloading}
    >
      {downloading ? (
        <span>
          <Spinner animation="border" size="sm" />{' '}
          {t('Downloading application')}
        </span>
      ) : (
        t('Download application')
      )}
    </Button>
  );
};

export default Download;
