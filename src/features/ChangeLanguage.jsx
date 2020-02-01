import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

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

const ChangeLanguage = () => {
  const { i18n } = useTranslation();
  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 10
      }}
    >
      <Button type="button" onClick={() => i18n.changeLanguage('sv')}>
        Svenska
      </Button>
      <Button type="button" onClick={() => i18n.changeLanguage('en')}>
        English
      </Button>
    </div>
  );
};

export default ChangeLanguage;
