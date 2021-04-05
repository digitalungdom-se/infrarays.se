import React, { useEffect } from "react";
import {
  authSuccess,
  selectAuthenticated,
  userInfoSuccess,
} from "features/auth/authSlice";

import Axios from "api/axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
      })
      .catch(console.error);
  }, [isAuthenticated]);
  return props.children;
}
