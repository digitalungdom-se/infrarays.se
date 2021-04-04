import { api } from "./axios";
import { makeUseAxios } from "axios-hooks";

export const useAxios = makeUseAxios({
  axios: api,
});

export default useAxios;
