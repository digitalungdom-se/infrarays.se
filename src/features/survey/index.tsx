import React from "react";
import Survey from "components/Survey";
import hasApplicationClosed from "utils/hasApplicationClosed";
import { useSurvey } from "./surveyHooks";

const PortalSurvey = (): React.ReactElement => {
  const { data, loading, updateSurvey } = useSurvey();
  if (loading) return <div></div>;
  const closed = hasApplicationClosed();
  return <Survey survey={data} onSubmit={updateSurvey} disabled={closed} />;
};

export default PortalSurvey;
