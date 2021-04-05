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
      state.survey = action.payload;
    },
    clearSurvey(state) {
      Object.assign(state, initialState);
    },
  },
});

export const selectSurvey = (state: RootState): SurveyAnswers | undefined =>
  state.survey.survey;

export const { setSurvey, clearSurvey } = surveySlice.actions;

export default surveySlice.reducer;
