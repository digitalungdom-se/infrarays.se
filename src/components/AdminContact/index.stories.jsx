import React from 'react';
import AdminContact from './index';

export default { title: 'AdminContact' };

export const Basic = () => (
  <div
    style={{
      padding: 50
    }}
  >
    <AdminContact />
    <AdminContact
      name="Douglas Bengtsson"
      email="douben@kth.se"
      superAdmin
      status="received"
    />
    <AdminContact
      name="Alfred Nobel"
      email="alfred@nobel.org"
      status="received"
    />
    <AdminContact
      name="Alfred Nobel"
      email="alfred@nobel.org"
      status="loading"
    />
    <AdminContact
      name="Alfred Nobel"
      email="alfred@nobel.org"
      initialErrors={{ email: 'email exists' }}
    />
  </div>
);
