import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RecommendationRequest } from "types/recommendations";
import { RootState } from "store";

type RecommendationsState = Record<string, RecommendationRequest[]>;

const initialState: RecommendationsState = {};

const recommendationsSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addPersonSuccess(state, action: PayloadAction<RecommendationRequest[]>) {
      action.payload.forEach((recommendation) => {
        if (state[recommendation.applicantId])
          state[recommendation.applicantId].push(recommendation);
        else state[recommendation.applicantId] = [recommendation];
      });
    },
  },
});

export const { addPersonSuccess } = recommendationsSlice.actions;

export const selectApplicantRecommendations = (applicantID?: string) => (
  state: RootState
): RecommendationRequest[] | undefined => {
  const id = applicantID || state.auth.user?.id;
  if (!id) return;
  return state.recommendations[id];
};

export const selectRecommendationByIndexAndApplicant = (
  recommendationIndex: number,
  applicantID?: string
) => (state: RootState): RecommendationRequest | undefined => {
  const id = applicantID || state.auth.user?.id;
  if (!id) return undefined;
  return state.recommendations[id][recommendationIndex];
};

export default recommendationsSlice.reducer;
