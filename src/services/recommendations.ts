import {
  RecommendationFile,
  RecommendationRequest,
} from "types/recommendations";

// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQuery from "fetchBaseQuery";

export const recommendationApi = createApi({
  reducerPath: "recommendationApi",
  baseQuery,
  tagTypes: ["Recommendation"],
  endpoints: (builder) => ({
    getRecommendations: builder.query<RecommendationRequest[], string | void>({
      query: (applicantId = "@me") => ({
        url: `/application/${applicantId}/recommendation`,
      }),
      providesTags: () => [{ type: "Recommendation", id: "@me" }],
    }),

    requestRecommendation: builder.mutation<
      RecommendationRequest,
      { applicantId?: string; recommendationIndex: number; email: string }
    >({
      query: ({ applicantId = "@me", recommendationIndex, email }) => ({
        url: `/application/${applicantId}/recommendation/${recommendationIndex}`,
        method: "POST",
        body: {
          email,
        },
      }),
      invalidatesTags: () => [{ type: "Recommendation", id: "@me" }],
    }),
    getRecommendationRequestConfig: builder.query<RecommendationFile, string>({
      query: (code) => ({
        url: `/application/recommendation/${code}`,
      }),
      providesTags: () => [{ type: "Recommendation", id: "@me" }],
    }),
    uploadLetterOfRecommendation: builder.mutation<
      RecommendationFile,
      { file: File; fileName: string; code: string }
    >({
      query: ({ file, fileName, code }) => {
        const form = new FormData();
        form.append("file", file, fileName);
        return {
          url: `/application/recommendation/${code}`,
          method: "POST",
          body: form,
        };
      },
      invalidatesTags: () => [{ type: "Recommendation", id: "@me" }],
    }),
  }),
});

export const {
  useRequestRecommendationMutation,
  useGetRecommendationsQuery,
  useGetRecommendationRequestConfigQuery,
  useUploadLetterOfRecommendationMutation,
} = recommendationApi;
