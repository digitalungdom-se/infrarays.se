import React from 'react';
import moment from 'moment';
import ContactPerson from './index';

export default { title: 'ContactPerson' };

export const withText = () => (
  <div
    style={{
      padding: 50
    }}
  >
    <ContactPerson status="nothing" />
    <ContactPerson email="foo@bar.com" loading status="requested" />
    <ContactPerson
      status="requested"
      cooldown={moment()
        .add(1, 'hour')
        .format('X')}
      email="example@email.com"
    />
    <ContactPerson email="malan@harvard.edu" status="received" />
  </div>
);
