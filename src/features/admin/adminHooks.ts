import { Admin, NewAdmin } from "types/user";
import {
  ApplicationGrade,
  IndividualGrading,
  IndividualGradingWithName,
} from "types/grade";
import { Statistics, SurveyAnswers } from "types/survey";
import { addAdmin, getGradesConfig, postApplicationGrade } from "api/admin";
import {
  selectAdmins,
  selectGradesByApplicant,
  setAdmins,
  setGrades,
  setMyGrade,
} from "./adminSlice";
import useApi, { UseApi } from "hooks/useApi";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import average from "utils/average";
import { useGetSurveysQuery } from "services/survey";

type UseGrades = (applicantId: string) => UseApi<
  IndividualGradingWithName[]
> & {
  addMyGrade: (grades: ApplicationGrade) => Promise<void>;
};

export const useGrades: UseGrades = (applicantId: string) => {
  useAdmins();
  const [{ loading, data, error }] = useApi<IndividualGrading[]>(
    getGradesConfig(applicantId)
  );
  const dispatch = useDispatch();
  const grades = useSelector(selectGradesByApplicant(applicantId));
  const addMyGrade = useCallback(
    (grades) =>
      postApplicationGrade(applicantId, grades).then((grading) => {
        setMyGrade(grading);
      }),
    [applicantId]
  );

  useEffect(() => {
    if (data && Boolean(grades) === false)
      dispatch(setGrades({ grades: data, applicantId }));
  }, [data]);
  return { loading, data: grades, error, addMyGrade };
};

interface UseAdmins extends UseApi<Admin[]> {
  addAdmin: (admin: NewAdmin) => Promise<Admin>;
}

export function useAdmins(): UseAdmins {
  const [{ loading, data, error }] = useApi<Admin[]>({
    url: "/admin",
    params: { skip: 0, limit: 20 },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && admins.length === 0) dispatch(setAdmins(data));
  }, [data]);
  const admins = useSelector(selectAdmins);
  const newAdmin = useCallback(
    (admin: NewAdmin) =>
      addAdmin(admin).then((res) => {
        dispatch(setAdmins([res]));
        return res;
      }),
    [dispatch]
  );
  return { loading, data: admins, error, addAdmin: newAdmin };
}

export function useStatistics(): UseApi<Statistics> {
  const { data, isLoading: loading, error } = useGetSurveysQuery();
  const statistics: Statistics = {
    numericals: {
      applicationPortal: {
        count: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        average: 0,
      },
      applicationProcess: {
        count: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        average: 0,
      },
      gender: {
        count: {
          MALE: 0,
          FEMALE: 0,
          OTHER: 0,
          UNDISCLOSED: 0,
        },
      },
    },
    strings: {
      city: [],
      school: [],
      improvement: [],
      informant: [],
    },
  };
  if (data) {
    data.forEach((answer) => {
      // Object.keys(answer).forEach((key) => {
      //   if (typeof answer[key] === "string") statistics[key];
      // });
      statistics.numericals.applicationPortal.count[answer.applicationPortal]++;
      statistics.numericals.applicationProcess.count[
        answer.applicationPortal
      ]++;
      statistics.numericals.gender.count[answer.gender]++;
      statistics.strings.city.push(answer.city as string);
      statistics.strings.school.push(answer.school as string);
      statistics.strings.improvement.push(answer.improvement as string);
      statistics.strings.informant.push(answer.informant as string);
    });
    statistics.numericals.applicationPortal.average = average(
      statistics.numericals.applicationPortal.count
    );
    statistics.numericals.applicationProcess.average = average(
      statistics.numericals.applicationProcess.count
    );
  }

  return {
    loading,
    data: statistics,
    error,
  };
}
