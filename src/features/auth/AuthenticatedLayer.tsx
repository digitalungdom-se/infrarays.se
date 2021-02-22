import React, { useEffect } from "react";
import { authSuccess, userInfoSuccess } from "features/auth/authSlice";

import Axios from "axios";
import { TokenStorage } from "utils/tokenInterceptor";
import { useDispatch } from "react-redux";

interface AuthenticatedLayerProps {
  children: React.ReactElement;
}

export default function AuthenticatedLayer(
  props: AuthenticatedLayerProps
): React.ReactElement {
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get("/user/@me")
      .then((res) => {
        dispatch(authSuccess());
        dispatch(userInfoSuccess(res.data));
      })
      .catch(() => TokenStorage.clear());
  }, [dispatch]);
  return props.children;
}
