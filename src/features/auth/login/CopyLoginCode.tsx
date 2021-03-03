import React from "react";

interface CopyLoginCodeProps {
  code: string;
}

const CopyLoginCode = ({ code }: CopyLoginCodeProps) => {
  return <div>{code}</div>;
};
export default CopyLoginCode;
