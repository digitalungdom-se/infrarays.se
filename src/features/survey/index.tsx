import React from "react";
import Survey from "components/Survey";
import moment from "moment";
import { useSurvey } from "./surveyHooks";

const PortalSurvey = (): React.ReactElement => {
  const { data, loading, updateSurvey } = useSurvey();
  if (loading) return <div></div>;
  const applicationHasClosed =
    moment.utc().month(2).endOf("month").diff(Date.now()) < 0;
  return (
    <Survey
      survey={data}
      onSubmit={updateSurvey}
      disabled={applicationHasClosed}
    />
  );
};

export default PortalSurvey;
