import React from 'react';
import CenterCard from 'components/CenterCard';
import { Translation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const GDPR = () => (
  <CenterCard maxWidth="600px" title="GDPR">
    <Translation i18nKey="GDPR">
      {t => <ReactMarkdown source={t('GDPR')} />}
    </Translation>
  </CenterCard>
);

export default GDPR;
