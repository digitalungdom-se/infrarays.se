import React from "react";
import Reference from "features/recommendations/Reference";
import TranslatedChapter from "./TranslatedChapter";

const RecommendationChapter = (): React.ReactElement => {
  const map = [];
  for (let i = 0; i < 3; i += 1) {
    map[i] = <Reference key={`email-person-${i}`} index={i} />;
  }
  return (
    <TranslatedChapter type="RECOMMENDATION_LETTER">{map}</TranslatedChapter>
  );
};

export default RecommendationChapter;
