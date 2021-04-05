import { RecommendationRequest } from "types/recommendations";
import api from "./axios";

export const requestRecommendation = (
  recommendationIndex: number,
  email: string
): Promise<RecommendationRequest> =>
  api.format.post<RecommendationRequest>(
    `/application/@me/recommendation/${recommendationIndex}`,
    {
      email,
    }
  );
