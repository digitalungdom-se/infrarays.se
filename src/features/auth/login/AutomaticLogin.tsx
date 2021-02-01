import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Axios from "axios";
import CenterCard from "components/CenterCard";
import Loading from "components/Loading";
import ReactMarkdown from "react-markdown";
import { TokenStorage } from "utils/tokenInterceptor";
import { useTranslation } from "react-i18next";

const AutomaticLogin = () => {
  const { token } = useParams<{ token: string }>();
  const { push } = useHistory();
  const [error, setError] = useState<string[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    Axios.post(
      "/user/oauth/token",
      {
        grant_type: "client_credentials",
      },
      {
        headers: { Authorization: `Email ${token}` },
      }
    )
      .then((res) => {
        TokenStorage.storeTokens(res.data);
        push("/");
      })
      .catch((err) => {
        if (!err.request.status)
          setError(["fetch error", "fetch error description"]);
        else setError(["Bad link", "Bad link description"]);
      });
  }, [token]);
  if (error.length)
    return (
      <CenterCard maxWidth="400px" title={t(error[0])}>
        <ReactMarkdown source={t(error[1]) || ""} />
      </CenterCard>
    );
  return <Loading />;
};
export default AutomaticLogin;
