import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Icon } from 'resources/star.svg';
import ReactRating from 'react-rating';

// https://stackoverflow.com/questions/39056537

const Star = styled(Icon)`
  &.full path {
    fill: ${props => props.theme.brand || 'gold'};
  }
  &.empty path {
    fill: gray;
  }
  width: 1rem;
  height: 1rem;
`;

const Rating = props => {
  return (
    <ReactRating
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      emptySymbol={<Star className="empty icon" />}
      fullSymbol={<Star className="full icon" />}
    />
  );
};

export default Rating;
