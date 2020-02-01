import React from 'react';
import Plate from 'components/Plate';
import Survey from './index';

export default {
  title: 'Survey',
  decorators: [
    Story => (
      <div style={{ padding: 50, background: '#f6f6f6' }}>
        <Plate>
          <Story />
        </Plate>
      </div>
    )
  ]
};

export const withText = () => <Survey>Hey!</Survey>;
