// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { ServerTokenResponse } from "types/tokens";

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
      providesTags: (result, error, arg) => [
        { type: "Survey", id: arg || "LIST" },
      ],
    }),
    postSurvey: builder.mutation<
      ServerTokenResponse,
      {
        survey: SurveyAnswers;
        applicantID?: string;
      }
    >({
      query: ({ survey, applicantID = "@me" }) => ({
        url: `/application/${applicantID}/survey`,
        method: "POST",
        body: survey,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Survey", id: arg?.applicantID || "LIST" },
      ],
    }),
    getSurveys: builder.query<SurveyAnswers[], void>({
      query: () => ({
        url: "/admin/survey",
      }),
    }),
  }),
});

export const { useGetSurveyQuery, usePostSurveyMutation, useGetSurveysQuery } =
  surveyApi;
