import { UseAxios, makeUseAxios } from "axios-hooks";

import { api as axios } from "api/axios";

export const useApi = makeUseAxios({
  axios,
});

export type UseApi = UseAxios;

export default useApi;
