import { IHttpRequest, IHttpResponse } from "../protocols/http.interface";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helper";
import { ControllerInterface } from "../protocols/controller.interface";
import { EmailValidatorInterface } from "../protocols/email-validator.interface";

export class SignUpController implements ControllerInterface {
  private readonly emailValidator: EmailValidatorInterface;

  constructor(emailValidator: EmailValidatorInterface) {
    this.emailValidator = emailValidator;
  }
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

    const isValid = this.emailValidator.isValid(httpRequest.body.email);
    console.log(isValid)
    if (!isValid) {
      return badRequest(new MissingParamError("email"));
    }

    // If all required fields are present, you need to provide a response
    return {
      statusCode: 200,
      body: "Success",
    };
  }
}
