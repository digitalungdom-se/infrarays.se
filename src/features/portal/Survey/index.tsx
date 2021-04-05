import { selectSurvey, setSurvey } from "../portalSlice";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import Survey from "components/Survey";
import { SurveyAnswers } from "types/survey";
import moment from "moment";
import { postSurvey } from "api/survey";
import useApi from "hooks/useApi";

function useSurvey(): [SurveyAnswers | undefined, boolean] {
  const [{ data, loading }] = useApi("/application/@me/survey");
  const dispatch = useDispatch();
  if (data) dispatch(setSurvey(data));
  const survey = useSelector(selectSurvey);
  return [survey, loading];
}

const PortalSurvey = (): React.ReactElement => {
  const [survey, loading] = useSurvey();
  const dispatch = useDispatch();
  if (loading) return <div></div>;
  const applicationHasClosed =
    moment.utc().month(2).endOf("month").diff(Date.now()) < 0;
  const handleSubmit = React.useCallback(
    (survey: SurveyAnswers) =>
      postSurvey(survey).then(() => {
        dispatch(setSurvey(survey));
        return;
      }),
    [dispatch]
  );
  return (
    <Survey
      survey={survey}
      onSubmit={handleSubmit}
      disabled={applicationHasClosed}
    />
  );
};

export default PortalSurvey;
