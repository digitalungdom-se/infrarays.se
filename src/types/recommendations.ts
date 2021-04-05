export type RecommendationRequest = {
  applicantId: string;
  email: string;
  lastSent: string;
  received: null | string;
  index: number;
  id: string;
};

export interface RecommendationFile extends RecommendationRequest {
  code?: string;
  applicantId: string;
  fileId: null | string;
}
