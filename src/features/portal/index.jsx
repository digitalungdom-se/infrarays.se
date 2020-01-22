import React from 'react';
import Center from 'components/Center';
import StyledPlate from 'components/Plate';
import Chapter from 'components/portal/Chapter';
import Upload from 'components/portal/Upload';
import ContactPerson from 'components/portal/ContactPerson';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { ButtonGroup, ProgressBar } from 'react-bootstrap';
import Logo from 'components/Logo';
import ReactMarkdown from 'react-markdown';
import portal from './portal.json';

export default () => {
  const complete = true;

  const people = [
    { email: null, status: 'nothing' },
    { email: 'email@example.org', status: 'requested' },
    { email: 'malan@harvard.edu', status: 'received' },
  ];

  const contactPeople = people.map((person) => (
    <ContactPerson
      status={person.status}
      email={person.email}
    />
  ));

  const Chapters = () => portal.chapters.map((chapter) => (
    <Chapter
      key={chapter.title}
      title={chapter.title}
      description={chapter.description}
      subtitle={chapter.subtitle}
      upload={(
        <Upload
          title="Ladda upp personligt brev"
          displayFileName
        />
      )}
    >
      {chapter.contactPeople && contactPeople}
    </Chapter>
  ));

  return (
    <Center noTop>
      <StyledPlate>
        <Logo
          style={{
            maxHeight: 70,
            maxWidth: '80%',
            margin: '20px auto',
            display: 'block',
          }}
        />
        <div>
          <h1>
            {portal.title}
          </h1>
          <ReactMarkdown
            source={portal.introduction}
          />
          <ProgressBar now={60} />
          <hr styled="color:#b8b8b8" size="1" />
        </div>
        <div>
          <Chapters />
          <div style={{ padding: '20px 0' }}>
            {
                complete && <Alert variant="success">Din ansökan är fullständig och är mottagen för Rays.</Alert>
              }
            <ButtonGroup>
              <Button variant="secondary">
                Logga ut
              </Button>
              <Button variant="danger">
                Radera konto
              </Button>
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
