import { authFail, authSuccess } from "features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
  useRevokeMutation,
  useSendLoginCodeMutation,
  useLoginWithEmailAndCodeMutation,
} from "services/auth";
import { userApi } from "services/user";
import Router from "next/router";
import { useGetUserQuery } from "services/user";

type UseLoginWithEmailAndCode = [
  loginWithEmailAndCode: (email: string, code: string) => Promise<void>,
  loggingIn: boolean
];

export function useLoginWithEmailAndCode(): UseLoginWithEmailAndCode {
  const dispatch = useDispatch();
  const [loginWithEmailAndCode, { isLoading: loggingIn }] =
    useLoginWithEmailAndCodeMutation();
  const login = (email: string, code: string) =>
    loginWithEmailAndCode({ email, code })
      .unwrap()
      .then((token) => {
        dispatch(authSuccess(token));
        dispatch(userApi.util.invalidateTags(["User"]));
      });

  return [login, loggingIn];
}

type UseSendLoginCode = [
  sendLoginCode: (email: string) => Promise<string>,
  sendingCode: boolean
];

export function useSendLoginCode(): UseSendLoginCode {
  const [sendCode, { isLoading: sendingCode }] = useSendLoginCodeMutation();
  const sendLoginCode = (email: string) => sendCode(email).unwrap();

  return [sendLoginCode, sendingCode];
}

type UseLogout = [logout: () => void, loggingOut: boolean];

export function useLogout(): UseLogout {
  const dispatch = useDispatch();
  const [revoke, { isLoading: loggingOut }] = useRevokeMutation();

  const logout = () =>
    revoke().then(() => {
      dispatch(authFail());
      dispatch(userApi.util.invalidateTags(["User"]));
    });

  return [logout, loggingOut];
}

type UseAuth = (shouldBeAuthenticated?: boolean, admin?: boolean) => void;

export const useAuth: UseAuth = (
  shouldBeAuthenticated = true,
  admin = false
) => {
  const { data: user } = useGetUserQuery("@me");

  const userType = user?.type;

  if (admin && userType === "APPLICANT") return Router.push("/");
  if (
    admin !== true &&
    shouldBeAuthenticated &&
    (userType === "ADMIN" || userType === "SUPER_ADMIN")
  )
    return Router.push("/admin");

  if (shouldBeAuthenticated !== Boolean(userType))
    return Router.push(shouldBeAuthenticated ? "/login" : "/");
};
