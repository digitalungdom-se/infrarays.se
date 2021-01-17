import React, { useState } from "react";
import Survey from "components/Survey";
import { useSelector } from "react-redux";

const PortalSurvey = ({ done }) => {
  const survey = useSelector((state) => state.app?.survey);
  const [loading, setLoading] = useState(false);
  return (
    <Survey
      done={done}
      loading={loading}
      survey={survey}
      onSubmit={(newSurvey) => {
        setLoading(true);
        fetch("/api/user/survey", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSurvey),
        })
          .then((res) => res.json())
          .then(() => {
            setLoading(false);
          });
      }}
    />
  );
};

export default PortalSurvey;
