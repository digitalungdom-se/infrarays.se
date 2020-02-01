import React from 'react';
import Survey from 'components/Survey';
import { useSelector, useDispatch } from 'react-redux';

const PortalSurvey = ({ done }) => {
  const dispatch = useDispatch();
  const survey = useSelector(state => state.app?.survey);
  return (
    <Survey
      done={done}
      survey={survey}
      onSubmit={newSurvey => {
        fetch('/api/user/survey', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newSurvey)
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
          });
      }}
    />
  );
};

export default PortalSurvey;
