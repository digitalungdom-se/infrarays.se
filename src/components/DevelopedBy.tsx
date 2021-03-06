import { Trans, WithTranslation, withTranslation } from "react-i18next";

import React from "react";
import bot from "resources/bot.svg";
import styled from "styled-components";

const StyledDiv = styled.div`
  text-align: center;
  height: 3rem; /* Footer height */
  & > div {
    img {
      height: 3rem;
      vertical-align: top;
    }
    margin: 0;
    display: inline-block;
    height: 100%;
    & > span {
      /* line-height: 1rem; */
      padding: 0;
      margin: 0;
      display: inline-block;
    }
    span > a {
      font-size: 0.8rem;
      margin-top: -0.5rem;
    }
  }
  margin: 0 auto;
`;

const DevelopedBy: React.FC<WithTranslation> = () => (
  <StyledDiv>
    <div>
      <img src={bot} />
      <span>
        <div>
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
        </div>
        <a
          href="https://www.digitalungdom.se/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Trans i18nKey="Source code" />
        </a>
      </span>
    </div>
  </StyledDiv>
);

export default withTranslation()(DevelopedBy);
