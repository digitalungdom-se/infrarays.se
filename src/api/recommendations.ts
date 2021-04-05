import {
  RecommendationFile,
  RecommendationRequest,
} from "types/recommendations";

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

export const getRecommendationRequestConfig = (code: string): string =>
  `/application/recommendation/${code}`;

export const uploadLetterOfRecommendation = (
  file: File,
  fileName: string,
  code: string
): Promise<RecommendationFile> => {
  const form = new FormData();
  form.append("file", file, fileName);
  return api.format.post<RecommendationFile>(
    `/application/recommendation/${code}`,
    form
  );
};
