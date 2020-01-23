import React from 'react';
import ContactPerson from 'components/portal/ContactPerson';

const data = [
  { email: null, status: 'nothing' },
  { email: 'email@example.org', status: 'requested' },
  { email: 'malan@harvard.edu', status: 'received' },
];

const References = () => data.map((person) => (
  <ContactPerson
    key={person.email}
    status={person.status}
    email={person.email}
  />
));

export default References;
