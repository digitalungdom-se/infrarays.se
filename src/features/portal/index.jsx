import React from 'react';
import Center from 'components/Center';
import StyledPlate from 'components/Plate';
import Chapter from 'components/portal/Chapter';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { ButtonGroup, ProgressBar } from 'react-bootstrap';
import Logo from 'components/Logo';
import ReactMarkdown from 'react-markdown';
import portal from 'config/portal.json';
import { useSelector } from 'react-redux';
import Upload from './Upload';
import References from './References';
import Logout from './Logout';
import Delete from './Delete';
import Download from './Download';

export default () => {
  const progress = useSelector(state => state.app.progress);

  const Chapters = () =>
    portal.chapters.map(chapter => (
      <Chapter
        key={chapter.title}
        title={chapter.title}
        description={chapter.description}
        subtitle={chapter.subtitle}
      >
        {chapter.upload && (
          <Upload
            label={chapter.upload.label}
            accept={chapter.upload.accept}
            fileType={chapter.fileType}
          />
        )}
        {chapter.contactPeople && <References />}
      </Chapter>
    ));

  return (
    <Center noTop>
      <StyledPlate>
        <Logo center maxWidth="80%" />
        <div>
          <h1>{portal.title}</h1>
          <ReactMarkdown source={portal.introduction} />
          <ProgressBar variant="custom" now={(progress / 4) * 100} />
          <hr styled="color:#b8b8b8" size="1" />
        </div>
        <div>
          <Chapters />
          <div style={{ padding: '20px 0' }}>
            {progress === 4 && (
              <Alert variant="success">
                Din ansökan är fullständig och är mottagen för Rays.
              </Alert>
            )}
            <ButtonGroup>
              <Delete />
              <Logout />
            </ButtonGroup>
            <Download style={{ float: 'right' }} />
          </div>
        </div>
      </StyledPlate>
    </Center>
  );
};
