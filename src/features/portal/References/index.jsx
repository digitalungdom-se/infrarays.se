import React, { useState } from 'react';
import ContactPerson from 'components/portal/ContactPerson';
import { useSelector, useDispatch } from 'react-redux';
import { addPersonSuccess } from 'features/appSlice';

const Person = ({ index }) => {
  const [loading, setLoading] = useState(false);
  const person = useSelector(
    state => state.app?.userData.recommendations[index]
  );

  const dispatch = useDispatch();

  function handleSubmit(email) {
    setLoading(true);
    let body;
    if (person?.email) {
      body = {
        email: person.email,
        newEmail: email
      };
    } else {
      body = { email };
    }
    fetch('/api/user/send/recommendation', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        if (res.type === 'success') {
          dispatch(addPersonSuccess({ email }));
        }
      });
  }

  let status = 'nothing';
  if (person) {
    status = person.received ? 'received' : 'requested';
  }

  return (
    <ContactPerson
      handleSubmit={handleSubmit}
      status={status}
      email={person?.email}
      loading={loading}
      sendDate={person?.send_date || '1970-01-01'}
      cooldown={['day', 1]}
    />
  );
};

const References = () => {
  const length = useSelector(
    state => state.app?.userData.recommendations.length
  );

  const map = [];

  const l = length < 3 ? 3 : length;

  for (let i = 0; i < l; i += 1) {
    map[i] = (
      <Person
        // eslint-disable-next-line react/no-array-index-key
        key={`email-person-${i}`}
        index={i}
      />
    );
  }

  return map;
};

export default References;
