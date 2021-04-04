import { api as axios } from "api/axios";
import { makeUseAxios } from "axios-hooks";

export const useApi = makeUseAxios({
  axios,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface UseApi<T, E = any> {
  loading: boolean;
  data: T;
  error: E;
}

export default useApi;
