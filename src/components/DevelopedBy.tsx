import { Trans, WithTranslation, withTranslation } from "react-i18next";

import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  text-align: center;
`;

const DevelopedBy: React.FC<WithTranslation> = () => (
  <StyledDiv>
    <Trans i18nKey="Developed by">
      Developed by
      <a
        href="https://www.digitalungdom.se/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Digital Ungdom
      </a>
    </Trans>
  </StyledDiv>
);

export default withTranslation()(DevelopedBy);
