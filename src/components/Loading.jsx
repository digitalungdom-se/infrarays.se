import CenterCard from "components/CenterCard";
import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => (
  <CenterCard maxWidth="360px">
    <Spinner
      animation="border"
      style={{
        margin: "0 auto",
        display: "block",
        fontSize: "3rem",
        width: "5rem",
        height: "5rem",
      }}
    />
  </CenterCard>
);

export default Loading;
