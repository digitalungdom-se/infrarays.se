import CustomSurvey from "components/CustomSurvey";
import { CustomSurveyQuestion } from "types/survey";
import React from "react";
import hasApplicationClosed from "utils/hasApplicationClosed";
import { useSurvey } from "./surveyHooks";

const PortalSurvey = (props: {
  config: CustomSurveyQuestion[];
}): React.ReactElement => {
  const { data, loading, updateSurvey } = useSurvey();
  if (loading) return <div></div>;
  const closed = hasApplicationClosed();
  return (
    <CustomSurvey
      config={props.config}
      initialValues={data}
      onSubmit={updateSurvey}
      disabled={closed}
    />
  );
};

export default PortalSurvey;
