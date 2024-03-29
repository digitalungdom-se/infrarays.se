import React, { useState } from "react";
import { selectAdmins, setAdmins } from "../adminSlice";
import { useDispatch, useSelector } from "react-redux";

import AddButton from "components/AddButton";
import AdminContact from "components/AdminContact";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { selectUserType } from "features/auth/authSlice";
import useAxios from "axios-hooks";

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
    params: { skip: 0, limit: 512 },
  });
  const dispatch = useDispatch();

  const [numberOfEmptyFields, setEmptyFields] = useState<number[]>([]);
  const userType = useSelector(selectUserType);
  const admins = useSelector(selectAdmins);
  if (data && admins.length === 0) dispatch(setAdmins(data));
  const emptyFields: React.ReactElement[] = [];
  numberOfEmptyFields.forEach((i) => {
    emptyFields.push(
      <AdminContact
        key={i + "admin"}
        onSubmit={(values) =>
          axios
            .post<AdminInfo>("/admin", {
              ...values,
              type: values.superAdmin ? "SUPER_ADMIN" : "ADMIN",
            })
            .then((res) => {
              setEmptyFields(numberOfEmptyFields.filter((x) => x !== i));
              dispatch(setAdmins([res.data]));
            })
        }
      />
    );
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Administration</h1>
      <p>
        För att lägga till en admin behöver du vara superadmin. En superadmin
        kan tekniskt sätt göra vad som helst, det vill säga ta bort andra admins
        eller ansökningar. En vanlig admin kan endast läsa och bedöma
        ansökningar.
      </p>
      {admins.map((admin) => (
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
            onClick={() =>
              setEmptyFields([
                ...numberOfEmptyFields,
                numberOfEmptyFields.length + 1,
              ])
            }
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
