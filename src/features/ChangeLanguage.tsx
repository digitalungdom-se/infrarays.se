import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Button = styled.button`
  border: none;
  background: none;

  :hover {
    text-decoration: underline;
  }

  :active {
    color: gray;
  }
`;

const ChangeLanguage = (): React.ReactElement => {
  const { i18n } = useTranslation();
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
      }}
    >
      <Button type="button" onClick={() => i18n.changeLanguage("sv")}>
        Svenska
      </Button>
      <Button type="button" onClick={() => i18n.changeLanguage("en")}>
        English
      </Button>
    </div>
  );
};

export default ChangeLanguage;
