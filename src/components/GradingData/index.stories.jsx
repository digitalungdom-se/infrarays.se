import React from 'react';
import GradingData from './index';

export default { title: 'GradingData' };

export const Basic = () => (
  <div
    style={{
      padding: 50
    }}
  >
    <GradingData
      applicationGrades={[
        {
          name: 'kelvin szolnoky',
          cv: 4,
          coverLetter: 4,
          essay: 4,
          grade: 4,
          recommendation: 4,
          overall: 4,
          comment: 'Kort kommentar.'
        },
        {
          name: 'douglas bengtsson',
          cv: 4,
          coverLetter: 4,
          essay: 4,
          grade: 4,
          recommendation: 4,
          overall: 4,
          comment: ''
        },
        {
          name: 'simon sondén',
          cv: 4,
          coverLetter: 4,
          essay: 4,
          grade: 4,
          recommendation: 4,
          overall: 4,
          comment: `Längre kommentar.
            ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.
            ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.
            ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.
          `
        }
      ]}
    />
  </div>
);
