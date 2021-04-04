import { Admin, NewAdmin } from "types/user";
import { addAdmin, getGradesConfig } from "api/admin";
import {
  selectAdmins,
  selectGradesByApplicant,
  setAdmins,
  setGrades,
} from "./adminSlice";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IndividualGrading } from "types/grade";
import useApi from "hooks/useApi";

export function useGrades(applicantId: string): UseGrades {
  useAdmins();
  const [{ loading, data, error }] = useApi<IndividualGrading[]>(
    getGradesConfig(applicantId)
  );
  const dispatch = useDispatch();
  const grades = useSelector(selectGradesByApplicant(applicantId));
  useEffect(() => {
    if (data && Boolean(grades) === false)
      dispatch(setGrades({ grades: data, applicantId }));
  }, [data]);
  return { loading, data: grades, error };
}

interface UseHook<T> {
  loading: boolean;
  error: any;
  data: T;
}

interface UseAdmins extends UseHook<Admin[]> {
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
