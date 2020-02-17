import React from 'react';
import OpenPDF from './index';

export default { title: 'OpenPDF' };

export const Button = () => (
  <div
    style={{
      padding: 50
    }}
  >
    <OpenPDF>Open</OpenPDF>
  </div>
);
