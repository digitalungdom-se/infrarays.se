import useApi, { UseApi } from "hooks/useApi";
import { useDispatch, useSelector } from "react-redux";

import { RecommendationRequest } from "types/recommendations";
import { selectApplicantRecommendations } from "./recommendationsSlice";

export const useRecommendations = (
  applicantID = "@me"
): UseApi<RecommendationRequest[]> => {
  const dispatch = useDispatch();
  const [{ loading, data, error }] = useApi<RecommendationRequest[]>({
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
    data: applicantRecommendations || [],
    error,
  };
};
