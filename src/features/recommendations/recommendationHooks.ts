import {
  NewRecommendationRequest,
  RecommendationRequest,
} from "types/recommendations";
import {
  addPersonSuccess,
  selectApplicantRecommendations,
} from "./recommendationsSlice";
import useApi, { UseApi } from "hooks/useApi";
import { useDispatch, useSelector } from "react-redux";

import { requestRecommendation } from "api/recommendations";
import { useCallback } from "react";

interface UseRecommendations extends UseApi<RecommendationRequest> {
  addReference: (
    request: NewRecommendationRequest
  ) => Promise<RecommendationRequest>;
}

export const useRecommendations = (
  index = -1,
  applicantID = "@me"
): UseRecommendations => {
  const dispatch = useDispatch();
  const [{ loading, data, error }] = useApi<RecommendationRequest[]>({
    url: `/application/${applicantID}/recommendation`,
  });
  const applicantRecommendations = useSelector(
    selectApplicantRecommendations(
      applicantID === "@me" ? undefined : applicantID
    )
  );
  if (data && !applicantRecommendations?.length) {
    dispatch(addPersonSuccess(data));
  }
  const addReference = useCallback(
    ({ index, email }: NewRecommendationRequest) => {
      return requestRecommendation(index, email).then((res) => {
        dispatch(addPersonSuccess([res]));
        return res;
      });
    },
    [dispatch]
  );
  return {
    loading,
    data: applicantRecommendations?.[index],
    error,
    addReference,
  };
};
