import React, { useState } from "react";
import { Trans, withTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import ContactPerson from "components/ContactPerson";
import TranslatedChapter from "./TranslatedChapter";
import { addPersonSuccess } from "features/recommendations/recommendationsSlice";
import moment from "moment";
import { requestRecommendation } from "api/recommendations";
import { selectRecommendationByIndexAndApplicant } from "features/recommendations/recommendationsSlice";
import { toast } from "react-toastify";
import { useRecommendations } from "features/recommendations/recommendationHooks";

const UploadLink = ({ code }: { code: string }) => (
  <a
    href={`/recommendation/${code}`}
    rel="noopewner noreferrer"
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
  const recommendation = useSelector(
    selectRecommendationByIndexAndApplicant(recommendationIndex)
  );
  const dispatch = useDispatch();
  const applicationHasClosed =
    moment.utc().month(2).endOf("month").diff(Date.now()) < 0;
  function handleSubmit(email: string) {
    setLoading(true);
    requestRecommendation(recommendationIndex, email)
      .then((res) => {
        setLoading(false);
        dispatch(addPersonSuccess([res]));
        if (res.code)
          toast(<TranslatedUploadLink code={res.code} />, {
            position: "bottom-center",
            autoClose: false,
          });
      })
      .catch(console.error);
  }
  return (
    <ContactPerson
      key={recommendation?.email}
      onSubmit={handleSubmit}
      email={recommendation?.email}
      loading={loading || initialLoading}
      received={Boolean(recommendation?.received)}
      sendDate={recommendation?.lastSent || "1970-01-01"}
      disabled={disabled || applicationHasClosed}
    />
  );
};

const References = (): React.ReactElement => {
  const map = [];
  const { loading } = useRecommendations();
  for (let i = 0; i < 3; i += 1) {
    map[i] = (
      <Person
        key={`email-person-${i}`}
        recommendationIndex={i}
        disabled={loading}
      />
    );
  }
  return (
    <TranslatedChapter type="RECOMMENDATION_LETTER">{map}</TranslatedChapter>
  );
};

export default References;
