import { IHttpRequest, IHttpResponse } from "../protocols/http.interface";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helper";
import { ControllerInterface } from "../protocols/controller.interface";

export class SignUpController implements ControllerInterface {
  handle(httpRequest: IHttpRequest): IHttpResponse {
    const requiredFields = [
      "name",
      "email",
      "password",
      "confirmationPassword",
    ];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    // If all required fields are present, you need to provide a response
    return {
      statusCode: 200,
      body: "Success",
    };
  }
}
