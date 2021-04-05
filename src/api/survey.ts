import { SurveyAnswers } from "types/survey";
import api from "./axios";

export const postSurvey = (
  survey: SurveyAnswers,
  applicantID = "@me"
): Promise<SurveyAnswers> =>
  api.format.post(`/application/${applicantID}/survey`, survey);
