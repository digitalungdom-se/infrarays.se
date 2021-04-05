import { NumericalStatistic } from "types/survey";
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import { useStatistics } from "./adminHooks";
import { useTranslation } from "react-i18next";

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
}

function NumericalTable({ answers, title }: NumericalTableProps) {
  const { t } = useTranslation();
  return (
    <>
      <h4>{title}</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{answers.average ? "Betyg" : "Svar"}</th>
            <th>Antal</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(answers.count).map((n, i) => (
            <tr key={title + "-" + n + "-" + i}>
              {console.log(t(n), n)}
              <td>{t(n)}</td>
              <td>{answers.count[n]}</td>
            </tr>
          ))}
          {answers.average && (
            <tr key={title + "-average"}>
              <td>{t("average")}</td>
              <td>{answers.average}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

function StatisticsPage(): React.ReactElement {
  const { loading, data } = useStatistics();
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
      <NumericalTable
        title={t("What are your thoughts on the application process?")}
        answers={data.applicationProcess}
      />
      <NumericalTable
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
