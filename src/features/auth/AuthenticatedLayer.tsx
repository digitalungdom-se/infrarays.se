import React, { useEffect } from "react";
import { appSuccess, selectAuthenticated } from "./../appSlice";
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
  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated)
      Axios.get("/user/@me")
        .then((res) => {
          dispatch(appSuccess(res));
        })
        .catch(console.error);
  }, [dispatch, isAuthenticated]);
  return props.children;
}
