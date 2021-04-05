import { getSurveyConfig, postSurvey } from "api/survey";
import { selectSurvey, setSurvey } from "./surveySlice";
import useApi, { UseApi } from "hooks/useApi";
import { useDispatch, useSelector } from "react-redux";

import { SurveyAnswers } from "types/survey";
import { useCallback } from "react";

interface UseSurvey extends UseApi<SurveyAnswers> {
  updateSurvey: (survey: SurveyAnswers) => Promise<void>;
}

export function useSurvey(applicantID = "@me"): UseSurvey {
  const [{ data, loading, error }] = useApi(getSurveyConfig(applicantID));
  const dispatch = useDispatch();
  const survey = useSelector(selectSurvey);
  if (data && survey === undefined) dispatch(setSurvey(data));
  const updateSurvey = useCallback(
    (survey: SurveyAnswers) =>
      postSurvey(survey).then(() => {
        dispatch(setSurvey(survey));
        return;
      }),
    [dispatch]
  );
  return { loading, data: survey, error, updateSurvey };
}
