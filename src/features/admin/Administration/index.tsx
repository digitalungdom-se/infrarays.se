import React, { useState } from "react";

import AddButton from "components/AddButton";
import AdminContact from "components/AdminContact";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { selectUserType } from "features/auth/authSlice";
import useAxios from "axios-hooks";
import { useSelector } from "react-redux";

interface AdminInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: "SUPER_ADMIN" | "ADMIN";
  verified: boolean;
  created: string;
}

const Administration: React.FC = () => {
  const [{ data, loading }] = useAxios<AdminInfo[]>({
    url: "/admin",
    params: { skip: 0, limit: 10 },
  });
  const [numberOfEmptyFields, addMoreFields] = useState<number>(0);
  const userType = useSelector(selectUserType);
  const emptyFields = [];
  for (let i = 0; i < numberOfEmptyFields; i++) {
    emptyFields.push(
      <AdminContact
        key={i + "admin"}
        onSubmit={(values) => axios.post("/admin", values)}
      />
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Administration</h1>
      <p>För att lägga till en admin</p>
      {data?.map((admin) => (
        <AdminContact
          key={admin.id}
          firstName={admin.firstName}
          lastName={admin.lastName}
          status={admin.verified ? "VERIFIED" : "REQUESTED"}
          email={admin.email}
          superAdmin={admin.type === "SUPER_ADMIN"}
        />
      ))}
      {userType === "SUPER_ADMIN" && (
        <>
          {emptyFields}
          <AddButton
            disabled={loading}
            onClick={() => addMoreFields(numberOfEmptyFields + 1)}
            style={{ width: "100%" }}
          >
            {loading && <Spinner animation="border" size="sm" />} Lägg till
            admin
          </AddButton>
        </>
      )}
    </div>
  );
};

export default Administration;
