import AdminContact from "./index";
import React from "react";

export default { title: "AdminContact" };

export const Basic = () => (
  <>
    <AdminContact
      onSubmit={() => new Promise((res) => setTimeout(res, 1000))}
    />
    <AdminContact
      firstName="Alfred"
      lastName="Nobel"
      email="alfred@nobel.org"
      superAdmin
      status="VERIFIED"
    />
    <AdminContact
      firstName="Alfred"
      lastName="Nobel"
      email="alfred@nobel.org"
      status="VERIFIED"
    />
    <AdminContact
      firstName="Alfred"
      lastName="Nobel"
      email="alfred@nobel.org"
      status="LOADING"
    />
    <AdminContact
      firstName="Alfred"
      lastName="Nobel"
      email="alfred@nobel.org"
      initialErrors={{ firstName: "firstName error" }}
    />
    <AdminContact
      firstName="Alfred"
      lastName="Nobel"
      email="alfred@nobel.org"
      initialErrors={{ lastName: "lastName error" }}
    />
    <AdminContact
      firstName="Alfred"
      lastName="Nobel"
      email="alfred@nobel.org"
      initialErrors={{ email: "email exists" }}
    />
  </>
);
