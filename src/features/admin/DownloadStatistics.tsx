import { CSVLink } from "react-csv";
import React from "react";
import { SurveyAnswers } from "./Statistics";

interface DownloadStatistics {
  data: SurveyAnswers[];
}

const DownloadStatistics = ({
  data,
}: DownloadStatistics): React.ReactElement => {
  return (
    <CSVLink
      data={data}
      filename={"statistics.csv"}
      className="btn btn-primary"
      style={{ marginBottom: "2rem" }}
    >
      Ladda ned statistik som CSV
    </CSVLink>
  );
};

export default DownloadStatistics;
