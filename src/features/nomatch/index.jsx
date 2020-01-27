import React from 'react';
import Center from 'components/Center';
import Plate from 'components/Plate';
import Star from 'components/Star';
import StyledTitle from 'components/StyledTitle';
import { Trans } from 'react-i18next';

const NoMatch = () => (
  <Center maxWidth="450px">
    <Plate>
      <StyledTitle>
          404
        <Star>
            *
        </Star>
      </StyledTitle>
      <hr />
      <Trans i18nKey="Not found">
          No page was found on this URL.
      </Trans>
    </Plate>
  </Center>
);

export default NoMatch;
