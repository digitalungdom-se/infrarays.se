import Survey, { SurveyAnswers } from "components/Survey";
import { selectSurvey, setSurvey } from "../portalSlice";
import { useDispatch, useSelector } from "react-redux";

import Axios from "api/axios";
import React from "react";
import moment from "moment";
import useAxios from "axios-hooks";

function useSurvey(): [SurveyAnswers | undefined, boolean] {
  const [{ data, loading }] = useAxios("/application/@me/survey");
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
