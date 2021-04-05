import Center from "./Center";
import Plate from "./Plate";
import React from "react";
import Star from "./Star";
import StyledTitle from "./StyledTitle";
import { Trans } from "react-i18next";

const NoMatch = (): React.ReactElement => (
  <Center maxWidth="450px">
    <Plate>
      <StyledTitle>
        404
        <Star>*</Star>
      </StyledTitle>
      <hr />
      <Trans i18nKey="Not found">No page was found on this URL.</Trans>
    </Plate>
  </Center>
);

export default NoMatch;
