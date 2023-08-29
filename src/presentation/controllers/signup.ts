import { IHttpRequest, IHttpResponse, ControllerInterface } from "../protocols";
import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helper";
import { EmailValidatorInterface } from "../protocols/email-validator.interface";

export class SignUpController implements ControllerInterface {
  private readonly emailValidator: EmailValidatorInterface;

  constructor(emailValidator: EmailValidatorInterface) {
    this.emailValidator = emailValidator;
  }
  handle(httpRequest: IHttpRequest): IHttpResponse {
    try {
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
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }

      // If all required fields are present, you need to provide a response
      return {
        statusCode: 200,
        body: "Success",
      };
    } catch (error) {
      return serverError();
    }
  }
}
