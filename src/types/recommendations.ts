export type RecommendationRequest = {
  applicantId: string;
  email: string;
  lastSent: string;
  received: null | string;
  index: number;
  id: string;
  code?: string;
};

export interface RecommendationFile extends RecommendationRequest {
  applicantId: string;
  fileId: null | string;
}
