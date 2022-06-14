import React, { useEffect } from "react";
import {
  authFail,
  selectAuthenticated,
  userInfoSuccess,
} from "features/auth/authSlice";

import { getUser } from "api/user";
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
    getUser()
      .then((res) => {
        dispatch(userInfoSuccess(res));
      })
      .catch((err) => {
        if (err.params.Authorization) dispatch(authFail());
      });
  }, [dispatch, isAuthenticated]);
  return props.children;
}
