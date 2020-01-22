import React from 'react';
import Center from 'components/Center';
import StyledPlate from 'components/Plate';
import Chapter from 'components/portal/Chapter';
import Upload from 'components/portal/Upload';
import ContactPerson from 'components/portal/ContactPerson';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap';
import portal from './portal.json';

export default () => {
  const complete = true;

  const people = [
    { email: null, status: 'nothing' },
    { email: null, status: 'nothing' },
    { email: null, status: 'nothing' },
  ];

  const contactPeople = people.map((person) => (
    <ContactPerson
      status="nothing"
      email={person.email}
    />
  ));

  const Chapters = () => portal.chapters.map((chapter) => (
    <Chapter
      key={chapter.title}
      title={chapter.title}
      description={chapter.description}
      subtitle={chapter.subtitle}
      upload={<Upload title="Ladda upp personligt brev" />}
    >
      {chapter.contactPeople && contactPeople}
    </Chapter>
  ));

  return (
    <Center noTop>
      <StyledPlate>
        <div className="title">
          <h1>
            {portal.title}
          </h1>
          <p>
            {portal.introduction}
          </p>

          <p>
              Vi som arrangerar Rays önskar dig ett stort lycka till
              och ser fram emot att få läsa din ansökan!
            <a href="http://raysforexcellence.se/ansok/" rel="noopener noreferrer" target="_blank" styled="text-decoration: none">För mer information tryck här!</a>
          </p>


          <div className="progress">
            <div className="progress-bar progress-bar-striped" role="progressbar" styled="width: <%= (counter/6) * 100 %>%; background-color: #DC0C05;" aria-valuenow="<%= counter %>" aria-valuemin="0" aria-valuemax="6" />
          </div>
          <hr styled="color:#b8b8b8" size="1" />
        </div>
        <div className="container">
          <Chapters />
          <div style={{ paddingTop: 20 }}>
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
