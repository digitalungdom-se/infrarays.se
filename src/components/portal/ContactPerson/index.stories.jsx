import React from 'react';
import moment from 'moment';
import ContactPerson from './index';

export default { title: 'ContactPerson' };

export const ThreePeople = () => (
  <div
    style={{
      padding: 50
    }}
  >
    <ContactPerson status="nothing" />
    <ContactPerson email="foo@bar.com" loading status="requested" />
    <ContactPerson
      status="requested"
      cooldown={['day', 1]}
      sendDate={moment()
        .subtract('day', 2)
        .toISOString()}
      email="example@email.com"
    />
    <ContactPerson
      status="requested"
      cooldown={['day', 1]}
      sendDate={moment()
        .subtract('hour', 23)
        .subtract('minute', 50)
        .toISOString()}
      email="example@email.com"
    />
    <ContactPerson
      status="requested"
      cooldown={['day', 1]}
      sendDate={moment().toISOString()}
      email="example@email.com"
    />
    <ContactPerson email="malan@harvard.edu" status="received" />
  </div>
);
