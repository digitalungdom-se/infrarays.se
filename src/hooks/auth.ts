import { authFail, authSuccess, selectToken } from "features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
  useRevokeMutation,
  useSendLoginCodeMutation,
  useLoginWithEmailAndCodeMutation,
} from "services/auth";
import { userApi } from "services/user";
import Router from "next/router";
import { useGetUserQuery } from "services/user";
import { fileApi } from "services/file";
import { useSelector } from "react-redux";

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
      dispatch({
        type: "auth/logout",
      });
      Router.push("/");
    });

  return [logout, loggingOut];
}

type UseAuth = (shouldBeAuthenticated?: boolean, admin?: boolean) => void;

export const useAuth: UseAuth = (
  shouldBeAuthenticated = false,
  admin = false
) => {
  const { data: user, isLoading, error } = useGetUserQuery("@me");

  if (isLoading) return;

  if (shouldBeAuthenticated && !user) {
    Router.push("/login");
  }

  if (!shouldBeAuthenticated && user) {
    switch (user.type) {
      case "APPLICANT":
        Router.push("/");
        break;
      case "ADMIN":
      case "SUPER_ADMIN":
        Router.push("/admin");
        break;
    }
  }

  // const userType = user?.type;

  // if (admin && userType === "APPLICANT") return Router.push("/");
  // if (
  //   admin !== true &&
  //   shouldBeAuthenticated &&
  //   (userType === "ADMIN" || userType === "SUPER_ADMIN")
  // )
  //   return Router.push("/admin");

  // if (shouldBeAuthenticated !== Boolean(userType))
  //   return Router.push(shouldBeAuthenticated ? "/login" : "/");
};

export const useGetIsAuthenticated = (): boolean => {
  const token = useSelector(selectToken);
  return Boolean(token);
};
