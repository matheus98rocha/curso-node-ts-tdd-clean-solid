import { IHttpResponse } from "../protocols/http.interfaces";

export const badRequest = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
}

