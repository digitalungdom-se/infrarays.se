import React from "react";
import { Table } from "react-bootstrap";

const GradingData = ({ applicationGrades = [] }) => (
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
          <tr key={`${grade.name}-grade`}>
            <td>{grade.firstName + " " + grade.lastName}</td>
            <td>{grade.cv.toFixed(2)}</td>
            <td>{grade.coverLetter.toFixed(2)}</td>
            <td>{grade.essays.toFixed(2)}</td>
            <td>{grade.grades.toFixed(2)}</td>
            <td>{grade.recommendations.toFixed(2)}</td>
            <td>{grade.overall.toFixed(2)}</td>
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
              <tr key={`${grade.name}-comment`}>
                <td>{grade.firstName + " " + grade.lastName}</td>
                <td style={{ wordBreak: "break-all" }}>{grade.comment}</td>
              </tr>
            )
        )}
      </tbody>
    </Table>
  </>
);

export default GradingData;
