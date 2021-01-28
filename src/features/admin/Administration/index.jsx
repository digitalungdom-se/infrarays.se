import AddButton from "components/AddButton";
import React from "react";

const Administration = () => (
  <div>
    <h1>Administration</h1>
    <p>För att lägga till en admin</p>
    <AddButton onClick={() => true}>Lägg till admin</AddButton>
  </div>
);

export default Administration;
