import Layout from "App";
import AdminLayout from "components/AdminLayout";
import { ReactElement, useMemo } from "react";
import { useGetApplicationsQuery } from "services/application";
import { Applicant } from "types/user";
import { useTable } from "react-table";
import OpenPDF from "components/OpenPDF";
import OpenGradingModalButton from "features/admin/OpenGradingModalButton";
import { useLazyGetApplicationPDFQuery } from "services/file";
import showFile from "utils/showFile";
import { useGetGradingOrderQuery } from "services/admins";
import clsx from "clsx";

interface TableForApplicantsProps {
  applicants: (Applicant & { done: boolean })[];
}

function TableForApplicants({ applicants }: TableForApplicantsProps) {
  const [getPDF] = useLazyGetApplicationPDFQuery();

  const columns = useMemo(
    () => [
      {
        Header: "Number",
        accessor: "number" as const,
      },
      {
        Header: "First name",
        accessor: "firstName" as const,
      },
      {
        Header: "Last name",
        accessor: "lastName" as const,
      },
      {
        Header: "Download",
        accessor: "id" as const,
        // Each cell has the "Applicant" interface
        Cell: ({ row }: { row: { values: { id: string } } }) => (
          <OpenPDF
            // variant={row.done ? "success" : undefined}
            // onDownload={() => downloadAndOpen(id)}
            onDownload={() =>
              getPDF(row.values.id).then((res) => {
                if (res.data) showFile(...res.data);
              })
            }
          >
            Download
          </OpenPDF>
        ),
      },
      {
        Header: "Grade",
        // accessor: "grade" as const,
        // no accesor since this is a dummy button
        Cell: ({
          row: {
            values: { id },
          },
        }: {
          row: { values: { id: string } };
        }) => (
          <OpenGradingModalButton
            key={id + "grade"}
            id={id}
            // variant={row.done ? "success" : undefined}
          />
        ),
      },
    ],
    [getPDF]
  );

  const data = useMemo(
    () =>
      applicants.map((applicant, index) => ({
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        number: index + 1,
        id: applicant.id,
        done: applicant.done,
      })),
    [applicants]
  );

  // Display applicant number (index in array), first name, last name, a dummy download button and a dummy grade button
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()} className="table-auto border-collapse w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.id}
            className="bg-gray-200"
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                key={column.id}
                className="px-4 py-2 text-left"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={row.id}
              className={clsx(row.original.done && "bg-green-200")}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="px-4 py-2"
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function Page() {
  const { data } = useGetApplicationsQuery();
  const { data: gradingOrder } = useGetGradingOrderQuery();

  return (
    <div>
      <TableForApplicants
        applicants={
          gradingOrder
            ?.map(({ applicantId, done }) => ({
              ...data?.find((applicant) => applicant.id === applicantId),
              done,
            }))
            .filter(
              (applicant): applicant is Applicant & { done: boolean } =>
                applicant !== undefined
            ) ?? []
        }
      />
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};
