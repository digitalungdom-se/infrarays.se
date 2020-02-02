import React from 'react';
import CenterCard from 'components/CenterCard';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => (
  <CenterCard maxWidth="360px">
    <Spinner
      animation="border"
      style={{
        margin: '0 auto',
        display: 'block',
        fontSize: '3rem',
        width: '10rem',
        height: '10rem'
      }}
    />
  </CenterCard>
);

export default Loading;
