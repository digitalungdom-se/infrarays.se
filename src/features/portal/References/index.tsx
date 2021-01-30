import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Axios from "axios";
import ContactPerson from "components/portal/ContactPerson";
import { RootState } from "store";
import { addPersonSuccess } from "features/portal/portalSlice";
import { selectRecommendation } from "features/portal/portalSlice";

interface PersonProps {
  recommendationIndex: number;
  initialLoading?: boolean;
}

const Person = ({ recommendationIndex, initialLoading }: PersonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const recommendation = useSelector((state: RootState) =>
    selectRecommendation(state, recommendationIndex)
  );
  const dispatch = useDispatch();
  function handleSubmit(email: string) {
    setLoading(true);
    Axios.post(`/application/@me/recommendation/${recommendationIndex}`, {
      email,
    }).then((res) => {
      setLoading(false);
      dispatch(addPersonSuccess([res.data]));
    });
  }
  return (
    <ContactPerson
      handleSubmit={handleSubmit}
      email={recommendation?.email}
      loading={loading || initialLoading}
      received={Boolean(recommendation?.received)}
      sendDate={recommendation?.lastSent || "1970-01-01"}
      cooldown={["day", 1]}
    />
  );
};

const References = () => {
  const map = [];
  for (let i = 0; i < 3; i += 1) {
    map[i] = <Person key={`email-person-${i}`} recommendationIndex={i} />;
  }
  return <>{map}</>;
};

export default References;
