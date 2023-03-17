import React, { useState } from "react";

import ContactPerson from "components/ContactPerson";
import TranslatedUploadLink from "./TranslatedUploadLink";
import hasApplicationClosed from "utils/hasApplicationClosed";
import { toast } from "react-toastify";
import { useRecommendations } from "./recommendationHooks";
import {
  useGetRecommendationsQuery,
  useRequestRecommendationMutation,
} from "services/recommendations";
import { useGetIsAuthenticated } from "hooks/auth";

interface ReferenceProps {
  index: number;
}

const Reference = ({ index }: ReferenceProps): React.ReactElement => {
  const isAuthenticated = useGetIsAuthenticated();
  const [loading, setLoading] = useState<boolean>(false);

  const { data: recommendations, isLoading: loadingReference } =
    useGetRecommendationsQuery();

  const [requestRecommendation] = useRequestRecommendationMutation();

  const closed = hasApplicationClosed();

  function handleSubmit(email: string) {
    setLoading(true);
    requestRecommendation({ email, recommendationIndex: index })
      .then((res: any) => {
        setLoading(false);
        if (res?.data?.code)
          toast(<TranslatedUploadLink code={res.data.code} />, {
            position: "bottom-center",
            autoClose: false,
          });
      })
      .catch(console.error);
  }

  const recommendation = recommendations?.find((r) => r.index === index);

  return (
    <ContactPerson
      key={recommendation?.email}
      onSubmit={handleSubmit}
      email={recommendation?.email}
      loading={loading}
      received={Boolean(recommendation?.received)}
      sendDate={recommendation?.lastSent || "1970-01-01"}
      disabled={loadingReference || closed || !isAuthenticated}
    />
  );
};

export default Reference;
