import ReactRating, { RatingComponentProps } from "react-rating";

import { ReactComponent as Icon } from "resources/star.svg";
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";

// https://stackoverflow.com/questions/39056537

const Star = styled(Icon)`
  &.full path {
    fill: ${(props) => props.theme.brand || "gold"};
  }
  &.empty path {
    fill: gray;
  }
  width: 1rem;
  height: 1rem;
  margin-top: -3px;
`;

export type RatingProps = RatingComponentProps;

const Rating = (props: RatingProps): React.ReactElement => (
  <ReactRating
    {...props}
    emptySymbol={<Star className="empty icon" />}
    fullSymbol={<Star className="full icon" />}
  />
);
export default Rating;
