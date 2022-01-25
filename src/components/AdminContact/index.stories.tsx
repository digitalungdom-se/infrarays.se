import AdminContact, { AdminContactProps } from "./index";
import { Meta, Story } from "@storybook/react";

import React from "react";

//👇 We create a "template" of how args map to rendering
const Template: Story<AdminContactProps> = (args) => <AdminContact {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  firstName: "Alfred",
  lastName: "Nobel",
  email: "alfred@nobel.org",
  superAdmin: false,
  // status: ["LOADING", "REQUESTED", "RECEIVED"],
};

export default {
  title: "AdminContact",
  component: AdminContact,
  //👇 Creates specific argTypes
  argTypes: {
    status: {
      control: {
        type: "select",
        options: [undefined, "LOADING", "REQUESTED", "VERIFIED"],
      },
    },
  },
} as Meta;

export const Basic = (): React.ReactElement => (
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
