import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faEdit } from '@fortawesome/free-solid-svg-icons';

export default () => {
  const data = [
    {
      firstname: 'Alfred',
      lastname: 'Nobel',
      email: 'alfred@nobel.org',
    },
  ];

  const Rows = () => data.map((person, index) => (
    <tr>
      <td>{index + 1}</td>
      <td>{person.firstname}</td>
      <td>{person.lastname}</td>
      <td>{person.email}</td>
      <td>
        <Button>
          <FontAwesomeIcon icon={faFileDownload} />
        </Button>
      </td>
      <td>
        <Button>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </td>
    </tr>
  ));

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Förnamn</th>
          <th>Efternamn</th>
          <th>Email</th>
          <th>Visa</th>
          <th>Bedöm</th>
        </tr>
      </thead>
      <tbody>
        <Rows />
      </tbody>
    </Table>
  );
};
