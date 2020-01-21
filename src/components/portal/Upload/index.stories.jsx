import React from 'react';
import { action } from '@storybook/addon-actions';
import Upload from './index';

export default { title: 'Upload' };

export const upload = () => (
  <Upload
    title="Personligt brev"
    onChange={action('file-change')}
  />
);
