import React from 'react';
import ContactPerson from './index';

export default { title: 'ContactPerson' };

export const withText = () => (
  <div
    style={{
      padding: 50,
    }}
  >
    <ContactPerson
      status="nothing"
    />
    <ContactPerson
      status="requested"
      email="douben@kth.se"
    />
    <ContactPerson
      email="douben@kth.se"
      status="received"
    />
  </div>
);
