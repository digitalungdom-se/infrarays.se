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
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from 'features/appSlice';
import UploadHook from './upload';
import References from './references';

export default () => {
  const progress = useSelector(state => state.app.progress);
  const dispatch = useDispatch();

  const Chapters = () =>
    portal.chapters.map(chapter => (
      <Chapter
        key={chapter.title}
        title={chapter.title}
        description={chapter.description}
        subtitle={chapter.subtitle}
      >
        {chapter.upload && (
          <UploadHook
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
              <Button
                variant="secondary"
                onClick={() => {
                  fetch('/api/user/logout', {
                    method: 'delete'
                  })
                    .then(res => res.json())
                    .then(res => {
                      if (res.type === 'success') {
                        dispatch(logoutSuccess());
                      }
                    });
                }}
              >
                Logga ut
              </Button>
              <Button variant="danger">Radera konto</Button>
            </ButtonGroup>
            <Button variant="primary" style={{ float: 'right' }}>
              Ladda ned din ansökan
            </Button>
          </div>
        </div>
      </StyledPlate>
    </Center>
  );
};
