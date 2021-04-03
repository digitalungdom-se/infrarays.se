import React from "react";

interface ApplicantInformationProps {
  email: string;
}

function ApplicantInformation({ email }: ApplicantInformationProps) {
  return (
    <div>
      <b>Email: </b>
      <a href={`mailto:${email}`}>{email}</a>
    </div>
  );
}

export default ApplicantInformation;
