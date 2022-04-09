import React, { useEffect } from "react";
import {
  authSuccess,
  selectAuthenticated,
  userInfoSuccess,
} from "features/auth/authSlice";

import Axios from "axios";
import { TokenStorage } from "utils/tokenInterceptor";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { applicationSuccess } from "features/application/applicationSlice";

interface AuthenticatedLayerProps {
  children: React.ReactElement;
}

export default function AuthenticatedLayer(
  props: AuthenticatedLayerProps
): React.ReactElement {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthenticated);
  useEffect(() => {
    Axios.get("/user/@me")
      .then((res) => {
        dispatch(authSuccess());
        dispatch(userInfoSuccess(res.data));
        Axios.get("/application/@me").then((r2) => {
          dispatch(applicationSuccess(r2.data));
        });
      })
      .catch(console.error);
  }, [isAuthenticated]);
  return props.children;
}
