import React from 'react';
import { Table } from 'react-bootstrap';

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
        {applicationGrades.map(grade => (
          <tr key={`${grade.name}-grade`}>
            <td>{grade.name}</td>
            <td>{grade.cv}</td>
            <td>{grade.coverLetter}</td>
            <td>{grade.essay}</td>
            <td>{grade.grade}</td>
            <td>{grade.recommendation}</td>
            <td>{grade.overall}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Table striped bordered hover>
      <thead>
        <th>Bedömare</th>
        <th>Kommentar</th>
      </thead>
      <tbody>
        {applicationGrades.map(
          grade =>
            Boolean(grade.comment) && (
              <tr key={`${grade.name}-comment`}>
                <td>{grade.name}</td>
                <td style={{ wordBreak: 'break-all' }}>{grade.comment}</td>
              </tr>
            )
        )}
      </tbody>
    </Table>
  </>
);

export default GradingData;
