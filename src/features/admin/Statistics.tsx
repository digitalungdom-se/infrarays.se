import React from "react";
import Table from "react-bootstrap/Table";
import useAxios from "axios-hooks";

interface UseStatistics {
  loading: boolean;
  data: any;
  error: any;
}

type StatisticalValue = "average";

interface NumericalStatistic {
  average: number;
  count: Record<Grade, number>;
}

interface Statistics {
  applicationProcess: NumericalStatistic;
  applicationPortal: NumericalStatistic;
  improvement: string[];
  informant: string[];
  city: string[];
  school: string[];
  gender: { count: Record<Gender, number> };
}

type Gender = "MALE" | "FEMALE" | "OTHER" | "UNDISCLOSED";
type Grade = 1 | 2 | 3 | 4 | 5;

export interface SurveyAnswers {
  city: string;
  school: string;
  gender: Gender;
  applicationPortal: Grade;
  applicationProcess: Grade;
  improvement: string;
  informant: string;
}

function average(answers: Record<number, number>) {
  let sum = 0;
  let n = 0;
  Object.keys(answers).forEach((answer) => {
    sum += parseInt(answer) * answers[parseInt(answer)];
    n += answers[parseInt(answer)];
  });
  return sum / n;
}

function useStatistics(): UseStatistics {
  const [{ loading, data, error }] = useAxios<SurveyAnswers[]>("/admin/survey");
  const statistics: Statistics = {
    applicationPortal: { count: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, average: 0 },
    applicationProcess: { count: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, average: 0 },
    gender: {
      count: {
        MALE: 0,
        FEMALE: 0,
        OTHER: 0,
        UNDISCLOSED: 0,
      },
    },
    city: [],
    school: [],
    improvement: [],
    informant: [],
  };
  if (data) {
    data.forEach((answer) => {
      statistics.applicationPortal.count[answer.applicationPortal]++;
      statistics.applicationProcess.count[answer.applicationPortal]++;
      statistics.gender.count[answer.gender]++;
      statistics.city.push(answer.city);
      statistics.school.push(answer.school);
      statistics.improvement.push(answer.improvement);
      statistics.informant.push(answer.informant);
    });
    statistics.applicationPortal.average = average(
      statistics.applicationPortal.count
    );
    statistics.applicationProcess.average = average(
      statistics.applicationProcess.count
    );
  }

  return {
    loading,
    data: statistics,
    error,
  };
}

interface StringTableProps {
  answers: string[];
  title: string;
}

function StringTable({ answers, title }: StringTableProps) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>{title}</th>
        </tr>
      </thead>
      <tbody>
        {answers.map((answer, i) => (
          <tr key={title + "-" + i}>
            <td>{answer}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

interface NumericalTableProps {
  title: string;
  answers: NumericalStatistic;
  isNumeric?: boolean;
}

function NumericalTable({ answers, title, isNumeric }: NumericalTableProps) {
  return (
    <>
      <h3>{title}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Field</th>
            <th>Antal</th>
          </tr>
        </thead>
        <tbody>
          {((Object.keys(answers.count) as unknown) as Grade[]).map((n, i) => (
            <tr key={title + "-" + n + "-" + i}>
              <td>{n}</td>
              <td>{answers.count[n]}</td>
            </tr>
          ))}
          {isNumeric &&
            (["average"] as StatisticalValue[]).map((key) => (
              <tr key={title + "-" + key + "-"}>
                <td>{key}</td>
                <td>{Math.round(answers[key] * 100) / 100}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

function StatisticsPage(): React.ReactElement {
  const { loading, data, error } = useStatistics();
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <NumericalTable
        isNumeric
        title="Process"
        answers={data.applicationProcess}
      />
      <NumericalTable
        isNumeric
        title="Portal"
        answers={data.applicationPortal}
      />
      <NumericalTable title="Gender" answers={data.gender} />
      <StringTable title="Stad" answers={data.city} />
      <StringTable title="Skola" answers={data.school} />
      <StringTable title="Förbättring" answers={data.improvement} />
      <StringTable title="Informant" answers={data.informant} />
    </div>
  );
}

export default StatisticsPage;
