import ContactPerson from "./index";
import React from "react";
import moment from "moment";

export default { title: "ContactPerson" };

export const ThreePeople = (): React.ReactElement => (
  <>
    <ContactPerson />
    <ContactPerson email="foo@bar.com" loading />
    <ContactPerson
      sendDate={moment().subtract(2, "days").toISOString()}
      email="example@email.com"
    />
    <ContactPerson
      sendDate={moment()
        .subtract(23, "hours")
        .subtract(50, "minutes")
        .toISOString()}
      email="example@email.com"
    />
    <ContactPerson
      sendDate={moment().toISOString()}
      email="example@email.com"
    />
    <ContactPerson email="malan@harvard.edu" received />
  </>
);
