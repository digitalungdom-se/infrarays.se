+import { GradingData } from "features/admin/adminSlice";
import React from "react";
import { Table } from "react-bootstrap";

interface GradingDataTableProps {
  applicationGrades: GradingData[];
}

const GradingDataTable = ({
  applicationGrades = [],
}: GradingDataTableProps): React.ReactElement => (
  <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Bedömare</th>
          <th>CV</th>
          <th>PB</th>
          <th>ES</th>
          <th>BT</th>
          <th>RB</th>
          <th>TO</th>
        </tr>
      </thead>
      <tbody>
        {applicationGrades.map((grade) => (
          <tr key={`${grade.id}-grade`}>
            <td>{grade.firstName + " " + grade.lastName}</td>
            <td>{grade.cv}</td>
            <td>{grade.coverLetter}</td>
            <td>{grade.essays}</td>
            <td>{grade.grades}</td>
            <td>{grade.recommendations}</td>
            <td>{grade.overall}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Bedömare</th>
          <th>Kommentar</th>
        </tr>
      </thead>
      <tbody>
        {applicationGrades.map(
          (grade) =>
            Boolean(grade.comment) && (
              <tr key={`${grade.id}-comment`}>
                <td>{grade.firstName + " " + grade.lastName}</td>
                <td style={{ wordBreak: "break-all" }}>{grade.comment}</td>
              </tr>
            )
        )}
      </tbody>
    </Table>
  </>
);

export default GradingDataTable;