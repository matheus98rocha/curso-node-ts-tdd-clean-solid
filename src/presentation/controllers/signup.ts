import { IHttpRequest, IHttpResponse } from "../protocols/http.interfaces";

export class SignUpController {
  handle(httpRequest: IHttpRequest): IHttpResponse {
    const requiredFields = ["name", "email"];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${field}`),
        };
      }
    }

    // If all required fields are present, you need to provide a response
    return {
      statusCode: 200,
      body: "Success",
    };
  }
}
