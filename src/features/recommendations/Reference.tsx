import React, { useState } from "react";

import ContactPerson from "components/ContactPerson";
import TranslatedUploadLink from "./TranslatedUploadLink";
import hasApplicationClosed from "utils/hasApplicationClosed";
import { toast } from "react-toastify";
import { useRecommendations } from "./recommendationHooks";

interface ReferenceProps {
  index: number;
}

const Reference = ({ index }: ReferenceProps): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    data: recommendation,
    loading: loadingReference,
    addReference,
  } = useRecommendations(index);

  const closed = hasApplicationClosed();

  function handleSubmit(email: string) {
    setLoading(true);
    addReference({ index, email })
      .then((res) => {
        setLoading(false);
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
      loading={loading}
      received={Boolean(recommendation?.received)}
      sendDate={recommendation?.lastSent || "1970-01-01"}
      disabled={loadingReference || closed}
    />
  );
};

export default Reference;
