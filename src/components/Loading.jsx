import Center from "./Center";
import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => (
  <Center maxWidth="100%">
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
  </Center>
);

export default Loading;
