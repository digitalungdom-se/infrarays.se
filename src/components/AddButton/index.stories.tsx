import AddButton, { AddButtonProps } from "./index";

import React from "react";
import { Story } from "@storybook/react";

//👇 We create a "template" of how args map to rendering
const Template: Story<AddButtonProps> = (args) => <AddButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: "Add admin",
};

export default { title: "AddButton" };

export const Basic = (): React.ReactElement => (
  <AddButton>Add something</AddButton>
);
