import { useDispatch, useSelector } from "react-redux";

import { RecommendationRequest } from "types/recommendations";
import { selectApplicantRecommendations } from "./recommendationsSlice";
import useAxios from "axios-hooks";

export const useRecommendations = (applicantID = "@me") => {
  const dispatch = useDispatch();
  const [{ loading, data, error }] = useAxios<RecommendationRequest[]>({
    url: `/application/${applicantID}/recommendation`,
  });
  const applicantRecommendations = useSelector(
    selectApplicantRecommendations(applicantID)
  );
  if (data && !applicantRecommendations) {
    dispatch(data);
  }
  return {
    loading,
    data: applicantRecommendations,
    error,
  };
};
