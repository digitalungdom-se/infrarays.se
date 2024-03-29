import Survey, { SurveyAnswers } from "components/Survey";
import { selectSurvey, setSurvey } from "../portalSlice";
import { useDispatch, useSelector } from "react-redux";

import Axios from "axios";
import React from "react";
import moment from "moment";
import useAxios from "axios-hooks";
import { selectIsFinnish } from "features/application/applicationSlice";

function useSurvey(): [SurveyAnswers | undefined, boolean] {
  const [{ data, loading }] = useAxios("/application/@me/survey");
  const dispatch = useDispatch();
  if (data) dispatch(setSurvey(data));
  const survey = useSelector(selectSurvey);
  return [survey, loading];
}

const PortalSurvey = () => {
  const [survey, loading] = useSurvey();
  const dispatch = useDispatch();
  const isFinnish = useSelector(selectIsFinnish);
  if (loading) return <div></div>;
  const applicationHasClosed = isFinnish
    ? moment("04-01", "MM-DD").utc().diff(Date.now()) < 0
    : moment.utc().month(2).endOf("month").diff(Date.now()) < 0;
  return (
    <Survey
      survey={survey}
      onSubmit={(newSurvey) => {
        return Axios.post("/application/@me/survey", newSurvey).then(() => {
          dispatch(setSurvey(newSurvey));
        });
      }}
      disabled={applicationHasClosed}
    />
  );
};

export default PortalSurvey;
