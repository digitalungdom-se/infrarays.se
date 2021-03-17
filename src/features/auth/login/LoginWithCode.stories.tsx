import LoginWithCode from "./LoginWithCode";
import React from "react";

export default { title: "LoginWithCode" };

export const Basic: React.FC = () => (
  <LoginWithCode email="email@example.org" />
);

export const FakeLoad: React.FC = () => {
  return (
    <LoginWithCode
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => setSubmitting(false), 1000);
      }}
      email="email@example.org"
    />
  );
};
