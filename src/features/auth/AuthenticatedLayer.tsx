import React, { useEffect } from "react";
import { selectAuthenticated, userInfoSuccess } from "features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

import Axios from "axios";

interface AuthenticatedLayerProps {
  children: React.ReactElement;
}

export default function AuthenticatedLayer(
  props: AuthenticatedLayerProps
): React.ReactElement {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthenticated);
  useEffect(() => {
    if (isAuthenticated)
      Axios.get("/user/@me")
        .then((res) => {
          dispatch(userInfoSuccess(res.data));
        })
        .catch(console.error);
  }, [dispatch, isAuthenticated]);
  return props.children;
}
