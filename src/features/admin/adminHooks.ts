import { selectGradesByApplicant, setAdmins, setGrades } from "./adminSlice";
import { useDispatch, useSelector } from "react-redux";

import useAxios from "axios-hooks";
import { useEffect } from "react";

interface UseGrades {
  loading: boolean;
  data: any;
  error: any;
}

export function useGrades(applicantId: string): UseGrades {
  useAdmins();
  const [{ loading, data, error }] = useAxios(
    `/application/${applicantId}/grade`
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) dispatch(setGrades({ grades: data, applicantId }));
  }, [data]);
  const gradesByApplicant = useSelector(selectGradesByApplicant(applicantId));
  return {
    loading,
    data: gradesByApplicant,
    error,
  };
}

interface AdminInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: "SUPER_ADMIN" | "ADMIN";
  verified: boolean;
  created: string;
}

export function useAdmins(): UseGrades {
  const [{ loading, data, error }] = useAxios<AdminInfo[]>({
    url: "/admin",
    params: { skip: 0, limit: 10 },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) dispatch(setAdmins(data));
  }, [data]);
  return { loading, data, error };
}
