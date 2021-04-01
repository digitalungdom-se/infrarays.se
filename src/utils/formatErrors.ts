import { AxiosResponse } from "axios";

/**
 * ServerErrorsByParam is an object containing information about a specific error
 */
type ServerErrorsByParam<Values, K = keyof Values> = {
  param: K;
  message: string;
  code: string;
  statusCode: number;
};

/**
 * Values of fields in the form
 */
export interface Values {
  [field: string]: never;
}

/**
 * FormattedErrors is an object containing errors for specific parameters
 * and general errors that don't rely on specific parameters
 */
export type FormattedErrors<Values> = {
  params: {
    [K in keyof Values]?: string;
  };
  general?: {
    message: string;
    code: string;
  };
};

/**
 * ServerErrorResponse is the object returned for an erroneous response
 */
type ServerErrorResponse = AxiosResponse<{
  errors: ServerErrorsByParam<Values>[];
}>;

/**
 * formatErrors is a function that formats an erroneous server response into a flattened error structure
 * @param err the error response from the Axios request
 */

type FormatErrors<Values> = (err: {
  response: ServerErrorResponse;
}) => FormattedErrors<Values>;
const formatErrors: FormatErrors<Values> = (err) => {
  const errors: FormattedErrors<Values> = {
    params: {},
  };
  if (err.response)
    err.response.data.errors.forEach((error) => {
      if (error.param) errors.params[error.param] = error.message;
      else errors.general = error;
    });
  else errors.general = { message: "Network error", code: "-1" };
  throw errors;
};

export default formatErrors;
