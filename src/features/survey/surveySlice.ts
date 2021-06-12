import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store";
import { SurveyAnswers } from "types/survey";

type SurveyState = Record<string, SurveyAnswers>;

export const initialState: SurveyState = {};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setSurvey(state, action: PayloadAction<SurveyAnswers>) {
      if (action.payload.applicantId)
        state[action.payload.applicantId] = action.payload;
    },
    clearSurvey(state) {
      Object.assign(state, initialState);
    },
  },
});

export const selectSurvey = (userID?: string) => (
  state: RootState
): SurveyAnswers | undefined => {
  const id = userID || state.auth.user?.id;
  if (!id) return;
  return state.survey[id];
};

export const { setSurvey, clearSurvey } = surveySlice.actions;

export default surveySlice.reducer;
