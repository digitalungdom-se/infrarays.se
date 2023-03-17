import { Applicant } from "types/user";

// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQuery from "fetchBaseQuery";
import { ApplicationGrade, IndividualGrading } from "types/grade";

export type RegistrationForm = Pick<
  Applicant,
  "firstName" | "lastName" | "birthdate" | "email" | "finnish"
>;

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery,
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    getApplication: builder.query<Applicant, string>({
      query: (user = "@me") => ({
        url: `/application/${user}`,
      }),
      providesTags: () => [{ type: "Application", id: "@me" }],
    }),
    registerApplication: builder.mutation<Applicant, RegistrationForm>({
      query: (application) => ({
        url: "/application",
        method: "POST",
        body: application,
      }),
      invalidatesTags: () => [{ type: "Application", id: "@me" }],
    }),
    getApplications: builder.query<Applicant[], void>({
      query: () => ({
        url: "/application",
      }),
      providesTags: () => [{ type: "Application", id: "LIST" }],
    }),
    postApplicationGrade: builder.mutation<
      IndividualGrading,
      {
        applicantID: string;
        form: ApplicationGrade;
      }
    >({
      query: ({ applicantID, form }) => ({
        url: `/application/${applicantID}/grade`,
        method: "POST",
        body: form,
      }),
    }),
  }),
});

export const {
  useGetApplicationQuery,
  useRegisterApplicationMutation,
  useGetApplicationsQuery,
  usePostApplicationGradeMutation,
} = applicationApi;
