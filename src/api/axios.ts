import axios, { AxiosRequestConfig } from "axios";

import { DEV_API_BASE_URL } from "./constants";
import formatErrors from "utils/formatErrors";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || DEV_API_BASE_URL,
});

interface FormattedRequests {
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

const format: FormattedRequests = {
  post: (url, data, config) =>
    api
      .post(url, data, config)
      .then((res) => res.data)
      .catch(formatErrors),
  get: (url, config) =>
    api
      .get(url, config)
      .then((res) => res.data)
      .catch(formatErrors),
  patch: (url, data, config) =>
    api
      .patch(url, data, config)
      .then((res) => res.data)
      .catch(formatErrors),
  delete: (url, config) =>
    api
      .delete(url, config)
      .then((res) => res.data)
      .catch(formatErrors),
};

export default {
  ...api,
  format,
};
