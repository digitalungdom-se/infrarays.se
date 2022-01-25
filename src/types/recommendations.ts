export interface RecommendationRequest extends NewRecommendationRequest {
  applicantId: string;
  lastSent: string;
  received: null | string;
  id: string;
  code?: string;
}

export type NewRecommendationRequest = {
  email: string;
  index: number;
};

export interface RecommendationFile extends RecommendationRequest {
  applicantId: string;
  fileId: null | string;
  fileName?: string;
}
