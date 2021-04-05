export interface ServerTokenResponse {
  access_token: string;
  refresh_token: string;
  expires: number;
  token_type: string;
}
