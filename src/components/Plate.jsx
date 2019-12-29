import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPlate = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
