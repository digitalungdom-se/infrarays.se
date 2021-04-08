import {
  selectAdmins,
  selectGradesByApplicant,
  setAdmins,
  setGrades,
} from "./adminSlice";
import { useDispatch, useSelector } from "react-redux";

import useAxios from "axios-hooks";
import { useEffect } from "react";

interface UseGrades {
  loading: boolean;
  data: any;
  error: any;
}

export function useGrades(applicantId: string): UseGrades {
  const admins = useAdmins();
  const [{ loading, data, error }] = useAxios(
    `/application/${applicantId}/grade`
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) dispatch(setGrades({ grades: data, applicantId }));
  }, [data]);
  const gradesByApplicant = useSelector(selectGradesByApplicant(applicantId));
  const result = {
    loading: admins.loading || loading,
    data: admins.loading ? null : gradesByApplicant,
    error,
  };
  console.log(result);
  return result;
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
    params: { skip: 0, limit: 512 },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) dispatch(setAdmins(data));
  }, [data]);
  const admins = useSelector(selectAdmins);
  return { loading, data: admins, error };
}
