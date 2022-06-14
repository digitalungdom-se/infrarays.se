// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { ServerTokenResponse } from "types/tokens";

import { RootState } from "store";
import baseQuery from "fetchBaseQuery";
import { SurveyAnswers } from "types/survey";

export const surveyApi = createApi({
  reducerPath: "surveyApi",
  baseQuery,
  tagTypes: ["Survey"],
  endpoints: (builder) => ({
    getSurvey: builder.query<SurveyAnswers, string | void>({
      query: (user = "@me") => ({
        url: `/application/${user}/survey`,
      }),
    }),
  }),
});

export const { useGetSurveyQuery } = surveyApi;
