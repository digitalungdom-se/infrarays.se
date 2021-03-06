import Survey, { SurveyAnswers } from "components/Survey";
import { selectSurvey, setSurvey } from "../portalSlice";
import { useDispatch, useSelector } from "react-redux";

import Axios from "axios";
import React from "react";
import useAxios from "axios-hooks";

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
  if (loading) return <div></div>;
  return (
    <Survey
      survey={survey}
      onSubmit={(newSurvey) => {
        return Axios.post("/application/@me/survey", newSurvey).then(() => {
          dispatch(setSurvey(newSurvey));
        });
      }}
    />
  );
};

export default PortalSurvey;
