import React, { useEffect, useState } from "react";

import CenterCard from "components/CenterCard";
import Loading from "components/Loading";
import ReactMarkdown from "react-markdown";
import { loginWithToken } from "../api";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AutomaticLogin: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [error, setError] = useState<string[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    loginWithToken(token).catch((err) => {
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
