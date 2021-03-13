import React, { useState } from "react";
import { Recommendation, addPersonSuccess } from "features/portal/portalSlice";
import { Trans, withTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Axios from "axios";
import ContactPerson from "components/portal/ContactPerson";
import { RootState } from "store";
import { selectRecommendation } from "features/portal/portalSlice";
import { toast } from "react-toastify";

const UploadLink = ({ code }: { code: string }) => (
  <a
    href={`/recommendation/${code}`}
    rel="noopener noreferrer"
    target="_blank"
    style={{ color: "black" }}
  >
    <Trans i18nKey="Click to open link" />
  </a>
);

const TranslatedUploadLink = withTranslation()(UploadLink);

interface PersonProps {
  recommendationIndex: number;
  initialLoading?: boolean;
  disabled?: boolean;
}

const Person = ({
  recommendationIndex,
  initialLoading,
  disabled,
}: PersonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const recommendation = useSelector((state: RootState) =>
    selectRecommendation(state, recommendationIndex)
  );
  const dispatch = useDispatch();
  function handleSubmit(email: string) {
    setLoading(true);
    Axios.post<Recommendation>(
      `/application/@me/recommendation/${recommendationIndex}`,
      {
        email,
      }
    )
      .then((res) => {
        setLoading(false);
        dispatch(addPersonSuccess([res.data]));
        if (
          res.data.code &&
          res.config.baseURL === "https://devapi.infrarays.digitalungdom.se"
        )
          toast(<TranslatedUploadLink code={res.data.code} />, {
            position: "bottom-center",
            autoClose: false,
          });
      })
      .catch(console.error);
  }
  return (
    <ContactPerson
      handleSubmit={handleSubmit}
      email={recommendation?.email}
      loading={loading || initialLoading}
      received={Boolean(recommendation?.received)}
      sendDate={recommendation?.lastSent || "1970-01-01"}
      cooldown={["day", 1]}
      disabled={disabled}
    />
  );
};

interface ReferencesProps {
  loading?: boolean;
}

const References = ({ loading }: ReferencesProps) => {
  const map = [];
  for (let i = 0; i < 3; i += 1) {
    map[i] = (
      <Person
        key={`email-person-${i}`}
        recommendationIndex={i}
        disabled={loading}
      />
    );
  }
  return <>{map}</>;
};

export default References;
