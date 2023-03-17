import React, { useState } from "react";

import AddButton from "components/AddButton";
import AdminContact from "components/AdminContact";
import { Spinner } from "react-bootstrap";

import Layout from "App";
import AdminLayout from "components/AdminLayout";
import { ReactElement } from "react";
import { useAddAdminMutation, useGetAdminsQuery } from "services/admins";
import { useGetUserQuery } from "services/user";

const Administration = () => {
  const { isLoading: loading, data } = useGetAdminsQuery({});
  const [addAdmin] = useAddAdminMutation();
  const [numberOfEmptyFields, setEmptyFields] = useState<number[]>([]);
  const { data: user } = useGetUserQuery();
  const userType = user?.type;
  console.log(data);
  const emptyFields: React.ReactElement[] = [];
  numberOfEmptyFields.forEach((i) => {
    emptyFields.push(
      <AdminContact
        key={i + "admin"}
        onSubmit={(values) =>
          addAdmin({
            ...values,
            type: values.superAdmin ? "SUPER_ADMIN" : "ADMIN",
          }).then(() =>
            setEmptyFields(numberOfEmptyFields.filter((x) => x !== i))
          )
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
      {data &&
        data.map((admin) => (
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

Administration.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

export default Administration;
