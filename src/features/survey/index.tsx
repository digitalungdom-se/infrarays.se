import CustomSurvey from "components/CustomSurvey";
import { CustomSurveyQuestion } from "types/survey";
import React from "react";
import hasApplicationClosed from "utils/hasApplicationClosed";
import { useGetSurveyQuery, usePostSurveyMutation } from "services/survey";
import { useGetIsAuthenticated } from "hooks/auth";

const PortalSurvey = (props: {
  config: CustomSurveyQuestion[];
}): React.ReactElement => {
  const isAuthenticated = useGetIsAuthenticated();
  const { data, isLoading } = useGetSurveyQuery();
  const [updateSurvey] = usePostSurveyMutation();
  if (isLoading) return <div></div>;
  const closed = hasApplicationClosed();
  return (
    <CustomSurvey
      config={props.config}
      initialValues={data}
      onSubmit={(survey) =>
        updateSurvey({
          survey,
        }).then(() => {
          return;
        })
      }
      disabled={closed || !isAuthenticated}
    />
  );
};

export default PortalSurvey;
