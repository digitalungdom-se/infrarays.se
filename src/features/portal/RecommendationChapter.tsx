import React from "react";
import Reference from "features/recommendations/Reference";

type RecommendationChapterProps = {
  max?: number;
};

const RecommendationChapter = ({
  max = 3,
}: RecommendationChapterProps): React.ReactElement => {
  const map = [];
  for (let i = 0; i < max; i += 1) {
    map[i] = <Reference key={`email-person-${i}`} index={i} />;
  }
  return <>{map}</>;
};

export default RecommendationChapter;
