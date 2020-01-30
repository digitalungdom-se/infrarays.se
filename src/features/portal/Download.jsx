import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import FileSaver from 'file-saver';

const Download = ({ style }) => {
  const [downloading, setDownload] = useState(false);
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
          <Spinner animation="border" size="sm" /> Laddar ned din ansökan
        </span>
      ) : (
        'Ladda ned din ansökan'
      )}
    </Button>
  );
};

export default Download;
