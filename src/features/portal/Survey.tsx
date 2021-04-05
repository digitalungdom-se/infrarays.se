import { selectSurvey, setSurvey } from "./portalSlice";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import Survey from "components/Survey";
import { SurveyAnswers } from "types/survey";
import TranslatedChapter from "./TranslatedChapter";
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
  const handleSubmit = React.useCallback(
    (survey: SurveyAnswers) =>
      postSurvey(survey).then(() => {
        dispatch(setSurvey(survey));
        return;
      }),
    [dispatch]
  );
  if (loading) return <div></div>;
  const applicationHasClosed =
    moment.utc().month(2).endOf("month").diff(Date.now()) < 0;
  return (
    <TranslatedChapter type="SURVEY">
      <Survey
        survey={survey}
        onSubmit={handleSubmit}
        disabled={applicationHasClosed}
      />
    </TranslatedChapter>
  );
};

export default PortalSurvey;
