import { Admin, NewAdmin } from "types/user";
import { IndividualGrading, IndividualGradingWithName } from "types/grade";
import { addAdmin, getGradesConfig } from "api/admin";
import {
  selectAdmins,
  selectGradesByApplicant,
  setAdmins,
  setGrades,
} from "./adminSlice";
import useApi, { UseApi } from "hooks/useApi";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useGrades(
  applicantId: string
): UseApi<IndividualGradingWithName[]> {
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
