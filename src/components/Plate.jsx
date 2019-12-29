import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPlate = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  max-width: 700px;
  @media(max-width: 400px) {
    width: 100%;
  }

  padding: 20px;
  background: #fff;
  color: #000;
  -moz-box-shadow: 0 0 3px #ccc;
  -webkit-box-shadow: 0 0 3px #ccc;
  -o-box-shadow: 0 0 3px #ccc;
  box-shadow: 0 0 3px #ccc;
  border-radius: 8px;
`;

const Plate = ({ children }) => (
  <StyledPlate>
    {children}
  </StyledPlate>
);

Plate.propTypes = {
  children: PropTypes.node,
};

Plate.defaultProps = {
  children: null,
};

export default Plate;
