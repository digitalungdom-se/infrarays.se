import React, { useEffect } from "react";
import { selectAuthenticated, userInfoSuccess } from "features/auth/authSlice";

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
      .catch(console.error);
  }, [isAuthenticated]);
  return props.children;
}
