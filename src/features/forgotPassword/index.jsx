import React from 'react';
import Center from 'components/Center';
import Plate from 'components/Plate';
import styled from 'styled-components';
import Star from 'components/Star';

const StyledTitle = styled.h1`
  color: ${(props) => props.theme.brand};
`;

const ForgotPassword = () => (
  <Center>
    <Plate>
      <StyledTitle>
        Forgot password?
        {' '}
        <Star>
        *
        </Star>
      </StyledTitle>
    </Plate>
  </Center>
);

export default ForgotPassword;
