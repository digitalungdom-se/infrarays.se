import DownloadStatistics from "./DownloadStatistics";
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import useAxios from "axios-hooks";
import { useTranslation } from "react-i18next";

interface UseStatistics {
  loading: boolean;
  data: any;
  error: any;
  array?: SurveyAnswers[];
}

type StatisticalValue = "average";

interface NumericalStatistic {
  average: number;
  count: Record<string | number, number>;
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
      statistics.applicationProcess.count[answer.applicationProcess]++;
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
    array: data,
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
  const { t } = useTranslation();
  return (
    <>
      <h4>{title}</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{isNumeric ? "Betyg" : "Svar"}</th>
            <th>Antal</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(answers.count).map((n, i) => (
            <tr key={title + "-" + n + "-" + i}>
              <td>{t(n)}</td>
              <td>{answers.count[n].toFixed(2)}</td>
            </tr>
          ))}
          {isNumeric &&
            (["average"] as StatisticalValue[]).map((key) => (
              <tr key={title + "-" + key + "-"}>
                <td>{t(key)}</td>
                <td>{Math.round(answers[key] * 100) / 100}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

function StatisticsPage(): React.ReactElement {
  const { loading, data, array, error } = useStatistics();
  const { t } = useTranslation();
  if (loading)
    return (
      <Spinner
        animation="border"
        style={{
          margin: "5rem auto",
          display: "block",
          fontSize: "3rem",
          width: "5rem",
          height: "5rem",
        }}
      />
    );
  return (
    <div>
      {array && <DownloadStatistics data={array} />}
      <NumericalTable
        isNumeric
        title={t("What are your thoughts on the application process?")}
        answers={data.applicationProcess}
      />
      <NumericalTable
        isNumeric
        title={t("What are your thoughts on the application portal?")}
        answers={data.applicationPortal}
      />
      <NumericalTable title={t("Gender")} answers={data.gender} />
      <StringTable title={t("What city do you live in?")} answers={data.city} />
      <StringTable
        title={t("Which school do you attend?")}
        answers={data.school}
      />
      <StringTable
        title={t("Improvements on application process and portal")}
        answers={data.improvement}
      />
      <StringTable
        title={t("How did you hear about Rays?")}
        answers={data.informant}
      />
    </div>
  );
}

export default StatisticsPage;
