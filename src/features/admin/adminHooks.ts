import { Admin, NewAdmin } from "types/user";
import { addAdmin, getAdmins, getGradesByApplicant } from "api/admin";
import {
  selectAdmins,
  selectGradesByApplicant,
  setAdmins,
  setGrades,
} from "./adminSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useAxios from "api/useAxios";

interface UseGrades {
  loading: boolean;
  data: any;
  error: any;
}
export function useGrades(applicantId: string): UseGrades {
  useAdmins();
  const dispatch = useDispatch();
  const grades = useSelector(selectGradesByApplicant(applicantId));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  if (loading === false && Boolean(grades) === false) {
    getGradesByApplicant(applicantId)
      .then((grades) => {
        setLoading(false);
        dispatch(setGrades({ grades, applicantId }));
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    setLoading(true);
  }
  return { loading, data: grades, error };
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

interface UseHook<T> {
  loading: boolean;
  error: any;
  data: T;
}

interface UseAdmins extends UseHook<AdminInfo[]> {
  addAdmin: (admin: NewAdmin) => Promise<Admin>;
}

export function useAdmins(): UseAdmins {
  const [{ loading, data, error }] = useAxios<AdminInfo[]>({
    url: "/admin",
    params: { skip: 0, limit: 20 },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) dispatch(setAdmins(data));
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

// export function useAdmins(): UseHook<AdminInfo[]> {
//   const dispatch = useDispatch();
//   // const admins = useSelector(selectAdmins);
//   const [{ loading, data, error }] = useAxios<AdminInfo[]>({
//     url: "/admin",
//     params: {
//       skip: 0,
//       limit: 10,
//     },
//   });
//   // useEffect(() => {
//   //   if (admins.length === 0 && data !== undefined) {
//   //     dispatch(setAdmins(data));
//   //   }
//   // }, [data]);
//   return {
//     loading,
//     data: data ? data : [],
//     error,
//   };
// }

// export function useAdmins(): UseHook<AdminInfo[]> {
//   const dispatch = useDispatch();
//   const admins = useSelector(selectAdmins);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<any>();
//   if (loading === false && admins.length === 0) {
//     setLoading(true);
//     getAdmins()
//       .then((res) => {
//         setLoading(false);
//         dispatch(setAdmins(res));
//       })
//       .catch((err) => {
//         setError(err);
//         setLoading(false);
//       });
//   }
//   return { loading, data: admins, error };
// }
